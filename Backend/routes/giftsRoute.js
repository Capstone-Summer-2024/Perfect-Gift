const express = require("express");
const router = express.Router();
const {
  createGift,
  getGift,
  getGifts,
  deleteGift,
} = require("../controllers/giftController");

// GET all gifts route
router.get("/", getGifts);

// GET a single gift route
router.get("/:id", getGift);

// POST a gift route
router.post("/", createGift);

// Delete a gift route
router.delete("/:id", deleteGift);

module.exports = router;
