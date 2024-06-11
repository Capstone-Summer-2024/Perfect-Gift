require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const giftSchema = new mongoose.Schema({
  gender: String,
  age: Number,
  relation: String,
  occasion: String,
});
const Gift = mongoose.model('Gift', giftSchema);

app.post('/submit', async (req, res) => {
  const { gender, age, relation, occasion } = req.body;

  try {
    const newGift = new Gift({ gender, age, relation, occasion });
    await newGift.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/', (req, res) => {
  res.send('testing from backend');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
