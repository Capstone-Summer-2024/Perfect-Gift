const Gift = require("../models/giftModel");
const OpenAI = require("openai");
const mongoose = require("mongoose");

// OpenAI api connection
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// get all gifts
const getGifts = async (req, res) => {
  const gifts = await Gift.find({}).sort({ createdAt: -1 });
  res.status(200).json(gifts);
};

//get a single gift
const getGift = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Gift Exists" });
  }

  const gift = await Gift.findById(id);
  if (!gift) {
    return res.status(404).json({ error: "No Such Gift Item exists" });
  }
  res.status(200).json(gift);
};

// create a gift
const createGift = async (req, res) => {
  const { gender, age, relation, occasion, interests, budget } = req.body;

  try {
    // prompt for OpenAI
    const userPrompt = `generate 5 questions based on the following input from gift giver to narrow down their gift choice selection based on the gift recipient - Gender: ${gender}\nAge: ${age}\nOccasion:${occasion}\nRelation:${relation}\nBudget: ${budget}\nInterests: ${interests}".`;

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

    const generatedSuggestion = openaiResponse.choices[0].message.content
      .trim()
      .split("\n");

    const gift = await Gift.create({
      gender,
      age,
      relation,
      occasion,
      interests,
      budget,
      questions: generatedSuggestion,
    });

    res.status(200).json({ gift, suggestion: generatedSuggestion });
  } catch (error) {
    console.error("Error from OpenAI API:", error); // Log any errors from OpenAI API
    res.status(400).json({ error: error.message });
  }
};

//delete a gift
const deleteGift = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Gift Exists" });
  }

  const gift = await Gift.findOneAndDelete({ _id: id });

  if (!gift) {
    return res.status(400).json({ error: "No Such Gift Item exists" });
  }

  res.status(200).json(gift);
};

module.exports = {
  createGift,
  getGift,
  getGifts,
  deleteGift,
};
