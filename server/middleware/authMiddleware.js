// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../utils/authUtils');

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  if (!token || !isAuthenticated(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  authenticateUser,
};
