const express = require("express");
const router = express.Router();
const {
  createSweet,
  getSweets,
  getSweetById,
  updateSweet,
  deleteSweet,
  searchSweets,
  addStock,
} = require("../controllers/sweetController");

const { verifyToken, requireRole } = require("../middleware/auth");

router.get("/", getSweets);
router.get("/search", searchSweets);
router.get("/:id", getSweetById);

router.post("/", verifyToken, requireRole("admin"), createSweet);
router.put("/:id", verifyToken, requireRole("admin"), updateSweet);
router.patch("/:id/add-stock", verifyToken, requireRole("admin"), addStock);
router.delete("/:id", verifyToken, requireRole("admin"), deleteSweet);

module.exports = router;
