const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    sweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sweet",
      required: true,
    },
    qtySold: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true }, // snapshot of price at sale
    total: { type: Number, required: true },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);
