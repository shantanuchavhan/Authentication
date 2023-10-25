const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/userModel'); // Import the user model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Middleware
app.use(express.json()); // Add the JSON body parser middleware

// Define a route that responds with "Hello, Express!" when you access the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});



app.post('/login', async (req, res) => {
    console.log(req.body.password)
    console.log(req.body.email)
    const user = await userModel.findOne({ email: req.body.email });
  
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
  
    try {
    
      if (req.body.password===user.password) {
        
        return res.json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

  app.post('/register', async (req, res) => {
    try {
      // Check if a user with the same email already exists
      const existingUser = await userModel.findOne({ email: req.body.email });
  
      if (existingUser) {
        // Send a response indicating that registration failed due to duplicate email
        return res.status(400).json({ message: 'User with the same email already exists' });
      }
  
      // Create a new user document based on the POST request data
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Hash the password before saving!
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      console.log('User registered:', savedUser);
      res.status(200).json({ message: 'User registered:' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });
  
  
  

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
