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

// create a gift and suggestion
const createGift = async (req, res) => {
  const { gender, age, relation, occasion, interests, budget } = req.body;

  try {
    // prompt for OpenAI
    const userPrompt = `generate 5 questions based on the following input from gift giver to narrow 
    down their gift choice selection based 
    on the gift recipient - Gender: ${gender}\nAge: ${age}\nOccasion:${occasion}\nRelation:${relation}\nBudget:
     ${budget}\nInterests: ${interests}".`;

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
//update a gift
const updateGift = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gift exists" });
  }

  try {
    const gift = await Gift.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true } // Return the updated document
    );

    if (!gift) {
      return res.status(400).json({ error: "No such gift exists" });
    }

    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the gift" });
  }
};

//post a gift answers and response
const updateGiftAnswers = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gift exists" });
  }

  try {
    // Find the gift document by ID
    const gift = await Gift.findById(id);

    if (!gift) {
      return res.status(400).json({ error: "No such gift exists" });
    }

    // Update the gift with the answers
    gift.answers = answers;
    await gift.save();

    // Prepare the prompt for OpenAI
    const userPrompt = `Based on the following information, 
    suggest 5 gift items, don't make the suggestion long, just the specific items or their catagory:
    Gender: ${gift.gender}
    Age: ${gift.age}
    Relation: ${gift.relation}
    Occasion: ${gift.occasion}
    Interests: ${gift.interests.join(", ")}
    Budget: ${gift.budget}
    Questions and Answers:
    ${gift.questions
      .map((q, index) => `Q: ${q}\nA: ${answers[index]}`)
      .join("\n")}
    `;

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

    const generatedItems = openaiResponse.choices[0].message.content
      .trim()
      .split("\n");

    // Update the gift with the final items
    gift.finalItems = generatedItems;
    await gift.save();

    res.status(200).json({ gift, items: generatedItems });
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    res
      .status(500)
      .json({ error: "Failed to update the gift and generate items" });
  }
};

// const fetchProducts = async (req, res) => {
//   const { query } = req.query;

//   console.log("Query Parameter:", query); // Log the query parameter

//   if (!query) {
//     return res.status(400).json({ error: "Query parameter is required" });
//   }

//   const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//         "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log("API Response Data:", data); // Log the response data to verify structure
//     res.status(200).json({ products: data.data.products || [] }); // Ensure 'data.data.products' matches the actual API response structure
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

const fetchProducts = async (req, res) => {
  const { query } = req.query;

  console.log("Query Parameter:", query); // Log the query parameter

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Log the response data to verify structure

    const products = data.data.products || [];

    if (products.length === 0) {
      console.log("No products found for the query:", query);
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = {
  createGift,
  getGift,
  getGifts,
  deleteGift,
  updateGift,
  updateGiftAnswers,
  fetchProducts,
};
