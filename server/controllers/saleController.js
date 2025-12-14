const mongoose = require("mongoose");
const Sweet = require("../models/Sweet");
const Sale = require("../models/Sale");

// Create a sale and decrement stock atomically
const createSale = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { sweetId, qtySold } = req.body;
    if (!sweetId || !qtySold || qtySold <= 0) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Invalid sweetId or qtySold" });
    }

    // Load sweet inside session
    const sweet = await Sweet.findById(sweetId).session(session);
    if (!sweet) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < qtySold) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Decrement stock
    sweet.quantity -= qtySold;
    await sweet.save({ session, validateBeforeSave: true });

    const total = qtySold * sweet.price;

    const sale = new Sale({
      sweet: sweet._id,
      qtySold,
      pricePerUnit: sweet.price,
      total,
      soldBy: req.user.id,
    });

    const savedSale = await sale.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Populate for response
    await savedSale.populate("sweet");

    await session.endSession();

    return res.status(201).json({ sale: savedSale, sweet });
  } catch (err) {
    try {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
    } catch (abortErr) {
      console.error("abortTransaction failed:", abortErr);
    } finally {
      await session.endSession();
    }

    console.error("createSale error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all sales (Admin)
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("sweet", "name price")
      .populate("soldBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json(sales);
  } catch (err) {
    console.error("getAllSales error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Sales report summary (Admin)
const getSalesReport = async (req, res) => {
  try {
    const report = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          totalItemsSold: { $sum: "$qtySold" },
          totalSales: { $sum: 1 },
        },
      },
    ]);

    const bestSelling = await Sale.aggregate([
      {
        $group: {
          _id: "$sweet",
          totalQty: { $sum: "$qtySold" },
        },
      },
      { $sort: { totalQty: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "sweets",
          localField: "_id",
          foreignField: "_id",
          as: "sweet",
        },
      },
      { $unwind: "$sweet" },
    ]);

    return res.status(200).json({
      totalRevenue: report[0]?.totalRevenue || 0,
      totalItemsSold: report[0]?.totalItemsSold || 0,
      totalSales: report[0]?.totalSales || 0,
      bestSellingSweet: bestSelling[0]
        ? {
            name: bestSelling[0].sweet.name,
            quantitySold: bestSelling[0].totalQty,
          }
        : null,
    });
  } catch (err) {
    console.error("getSalesReport error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Reset sales report (Admin only)
const resetSales = async (req, res) => {
  try {
    await Sale.deleteMany({});
    return res.status(200).json({
      message: "Sales report reset successfully",
    });
  } catch (err) {
    console.error("resetSales error:", err);
    return res.status(500).json({ message: "Failed to reset sales report" });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSalesReport,
  resetSales,
};
