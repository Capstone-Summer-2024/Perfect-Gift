const express = require("express");
const router = express.Router();
const {
  createGift,
  getGift,
  getGifts,
  deleteGift,
  updateGift,
  updateGiftAnswers,
} = require("../controllers/giftController");

// GET all gifts route
router.get("/", getGifts);

// GET a single gift route
router.get("/:id", getGift);

// POST a gift route
router.post("/", createGift);

// Delete a gift route
router.delete("/:id", deleteGift);

// update a gift route
router.patch("/:id", updateGift);

//update gift answers route
router.post("/:id/answers", updateGiftAnswers);

module.exports = router;
