const Message = require('../models/Message');

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMessage = async (req, res) => {
    const { user, message } = req.body;

    const newMessage = new Message({
        user,
        message
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getMessages,
    addMessage
};
