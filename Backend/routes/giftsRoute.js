const express = require("express");
const router = express.Router();
const {
  createGift,
  getGift,
  getGifts,
  deleteGift,
  updateGift,
  updateGiftAnswers,
  fetchProducts, // Import the new function
} = require("../controllers/giftController");

// Fetch products from RapidAPI
router.get("/search", fetchProducts); // Add the new route at the top

// GET all gifts route
router.get("/", getGifts);

// GET a single gift route
router.get("/:id", getGift);

// POST a gift route
router.post("/", createGift);

// Delete a gift route
router.delete("/:id", deleteGift);

// Update a gift route
router.patch("/:id", updateGift);

// Update gift answers route
router.post("/:id/answers", updateGiftAnswers);

module.exports = router;
