const express = require("express");
const OpenAI = require("openai");
const Gift = require("../models/giftModel");
const router = express.Router();

// OpenAI api connection
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET all gifts
router.get("/", (req, res) => {
  res.json({ mssg: "Get all gifts" });
});

// GET a single gift
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get a single gift" });
});

// POST a gift
router.post("/", async (req, res) => {
  const { gender, age, relation, occasion, interests, budget } = req.body;

  try {
    const gift = await Gift.create({
      gender,
      age,
      relation,
      occasion,
      interests,
      budget,
    });

    // prompt for OpenAI
    const userPrompt = `generate 5 questions based on the following input from gift giver to narrow down their gift choice selection based on the gift recipient - gender: ${gender}, age: ${age}, occasion:${occasion}, relation:${relation}, budget: ${budget}, interests:${interests}".`;

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 200,
    });

    console.log(openaiResponse); // Debugging: Log the full response

    const generatedSuggestion = openaiResponse.choices[0].message.content;

    res.status(200).json({ gift, suggestion: generatedSuggestion });
  } catch (error) {
    console.error("Error from OpenAI API:", error); // Log any errors from OpenAI API
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
