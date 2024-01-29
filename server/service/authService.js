// services/authService.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwtUtils');

class AuthService {
  // Other service functions...

  async verifyUser(email, password) {
    try {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // User exists and password is correct
        return user;
      } else {
        // User not found or incorrect credentials
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  generateAuthToken(user) {
    const tokenPayload = {
      userId: user._id,
      userEmail: user.email,
    };

    const token = createToken(tokenPayload);
    return { token, payload: tokenPayload };
  }

  setTokenCookie(res, token) {
   res.cookie('token', token, { httpOnly: true });
  }

  clearTokenCookie(res) {
    res.clearCookie('token');
  }
}

module.exports = new AuthService();
