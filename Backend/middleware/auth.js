const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key'; // Load JWT secret key from environment

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
