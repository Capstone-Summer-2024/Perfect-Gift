require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bcrypt = require('bcrypt');
const { auth } = require('./firebaseAdmin'); // Import Firebase admin

const app = express();
const PORT = process.env.PORT || 5001;
const saltRounds = 10;

// importing routes
const giftRoutes = require('./routes/giftsRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model if they are not already defined
const giftSchema = new mongoose.Schema({
  gender: String,
  age: Number,
  relation: String,
  occasion: String,
  interests: [String],
  budget: Number,
});

const Gift = mongoose.models.Gift || mongoose.model('Gift', giftSchema);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to generate gift recommendations
async function generateGiftRecommendations(prompt) {
  try {
    const result = await model.generateContent({ prompt: prompt });
    const response = await result.response;
    return response.text();  // Make sure to adjust based on actual SDK response handling
  } catch (error) {
    console.error('Error generating content:', error);
    return 'Error generating suggestions.';
  }
}

app.post('/submit', async (req, res) => {
  const { gender, age, relation, occasion, interests, budget } = req.body;
  const prompt = `Generate gift ideas for a ${age}-year-old ${gender} interested in ${interests.join(', ')} for the occasion of ${occasion}.`;

  try {
    const newGift = new Gift({ gender, age, relation, occasion, interests, budget });
    await newGift.save();
    const recommendations = await generateGiftRecommendations(prompt);
    res.status(201).json({ message: 'Data saved successfully!', recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data', details: error });
  }
});

// User registration
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Error hashing password');
      return;
    }

    auth.createUser({ email, password })
      .then(userRecord => {
        res.status(201).json({ message: 'User registered successfully', userRecord });
      })
      .catch(error => {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
      });
  });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  auth.getUserByEmail(email)
    .then(userRecord => {
      bcrypt.compare(password, userRecord.passwordHash, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send('Error comparing passwords');
          return;
        }
        if (isMatch) {
          auth.createCustomToken(userRecord.uid)
            .then(customToken => res.json({ token: customToken }))
            .catch(error => {
              console.error('Error creating custom token:', error);
              res.status(500).json({ error: error.message });
            });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: error.message });
    });
});

app.use('/api/gifts', giftRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
