require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const giftSchema = new mongoose.Schema({
  gender: String,
  age: Number,
  relation: String,
  occasion: String,
  interests: [String],
  budget: Number,
});
const Gift = mongoose.model("Gift", giftSchema);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate gift recommendations
async function generateGiftRecommendations(prompt) {
  try {
    const result = await model.generateContent({ prompt: prompt });
    const response = await result.response;
    return response.text();  // Make sure to adjust based on actual SDK response handling
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating suggestions.";
  }
}

app.post("/submit", async (req, res) => {
  const { gender, age, relation, occasion, interests, budget } = req.body;
  const prompt = `Generate gift ideas for a ${age}-year-old ${gender} interested in ${interests.join(", ")} for the occasion of ${occasion}.`;

  try {
    const newGift = new Gift({ gender, age, relation, occasion, interests, budget });
    await newGift.save();
    const recommendations = await generateGiftRecommendations(prompt);
    res.status(201).json({ message: "Data saved successfully!", recommendations });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data", details: error });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
