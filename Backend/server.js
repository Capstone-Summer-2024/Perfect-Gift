require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 5001;

// importing routes
const giftRoutes = require("./routes/giftsRoute");

app.use(cors());

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}!!!`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/submit", async (req, res) => {
  const { gender, age, relation, occasion } = req.body;

  try {
    const newGift = new Gift({ gender, age, relation, occasion });
    await newGift.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// // OpenAI api connection
// const openai = new OpenAI({
//   apiKey: "sk-proj-YZumDu8497HLk2joB5GJT3BlbkFJ6MLb6UKBx3Gcuvu5U8Pj",
// });

//middleware
// checks for body in any req
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/gifts", giftRoutes);
// app.get("/getResponse", async (req, res) => {
//   const userReq = req.body.userPrompt;
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "user",
//         content: userReq,
//       },
//     ],
//   });
//   console.log(response.choices[0].message.content);
// });
