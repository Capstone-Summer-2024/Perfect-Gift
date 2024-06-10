require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for testing

//testing source control
app.get('/', (req, res) => {
  res.send('Hello World from the Backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
