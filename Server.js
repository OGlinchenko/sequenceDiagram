const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Assuming you're using MongoDB

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Define User Model
const User = mongoose.model('User', userSchema);

// Parse incoming JSON data
app.use(bodyParser.json());

// Register a new user
app.post('/users/register', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Return created user
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user information (replace with specific ID retrieval logic)
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Users service listening on port ${port}`));
