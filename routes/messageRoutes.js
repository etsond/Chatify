
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get Messages Route
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create Message Route
router.post('/messages', async (req, res) => {
    try {
        const message = new Message({
            content: req.body.content,
            sender: req.body.sender
        });
        await message.save();
        res.status(201).send('Message sent successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
