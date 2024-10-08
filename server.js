const express = require('express');
const db = require('./config/connection'); // Ensure your MongoDB connection is set up here
const routes = require('./routes'); // Import your route index
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); // Middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // For parsing incoming form data
app.use(routes); // Use your routes

// Start the server only if the database is successfully connected
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
