const express = require("express");
const router = express.Router();

const {
  createSale,
  getAllSales,
  getSalesReport,
  resetSales,
} = require("../controllers/saleController");

const { verifyToken, requireRole } = require("../middleware/auth");

// Create sale → staff + admin
router.post("/", verifyToken, createSale);

// View all sales → admin only
router.get("/", verifyToken, requireRole("admin"), getAllSales);

// Sales report summary → admin only
router.get(
  "/report/summary",
  verifyToken,
  requireRole("admin"),
  getSalesReport
);

//Reset sales report → admin only
router.delete("/report/reset", verifyToken, requireRole("admin"), resetSales);

module.exports = router;
