// utils/jwtUtils.js

const jwt = require('jsonwebtoken');

function createToken(payload) {
  const secretKey = 'your-secret-key'; // Change this to a strong secret key
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secretKey, options);
}

function setTokenCookie(res, token) {
   res.cookie('token', token, { httpOnly: true });
}

module.exports = {
  createToken,
  setTokenCookie,
};
