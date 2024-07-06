const express = require('express');
const { getMessages, addMessage } = require('../controllers/chatController');

const router = express.Router();

router.route('/').get(getMessages).post(addMessage);

module.exports = router;
