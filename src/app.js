const express = require('express');
const { adminMiddleware } = require('../middlewares/auth');
const User = require('../models/user'); // Import the User model
const connectDb = require('./config/database'); // Connect to MongoDB
const app = express();
const port = 3000;

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender } = req.body;
        const user = new User({ firstName, lastName, email, password, age, gender });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
})