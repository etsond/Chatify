// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

require('dotenv').config();
// Register Route
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({ userId: user._id }, ' process.env.SECRET_KEY');
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;
