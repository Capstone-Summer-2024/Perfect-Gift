const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for testing

//testing source control
app.get('/', (req, res) => {
  res.send('This is a test Message Hello!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`PORT environment variable: ${process.env.PORT}`);

});
