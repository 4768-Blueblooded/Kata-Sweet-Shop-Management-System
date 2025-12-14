const Sweet = require("../models/Sweet");

/* CREATE SWEET*/
exports.createSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Failed to create sweet" });
  }
};

//Get all Sweets
exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find().sort({ name: 1 });
  res.json(sweets);
};

// SEARCH SWEETS (FIXED)
exports.searchSweets = async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) {
    const all = await Sweet.find().sort({ name: 1 });
    return res.json(all);
  }

  const sweets = await Sweet.find({
    name: { $regex: q, $options: "i" },
  }).sort({ name: 1 });

  res.json(sweets);
};

// GET SINGLE SWEET

exports.getSweetById = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  res.json(sweet);
};

// UPDATE SWEET
exports.updateSweet = async (req, res) => {
  const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// ADD STOCK TO SWEET

exports.addStock = async (req, res) => {
  const { amount } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  sweet.quantity += Number(amount);
  await sweet.save();

  res.json(sweet);
};

// DELETE SWEET
exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};
