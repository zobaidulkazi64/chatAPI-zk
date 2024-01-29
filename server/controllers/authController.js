// controllers/authController.js

const authService = require('../service/authService');
const cookieParser = require('cookie-parser')

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await authService.verifyUser(email, password);

    if (user) {
      const {token, payload} = authService.generateAuthToken(user);
      authService.setTokenCookie(res, token);

      console.log(token);

      res.status(200).json({ message: 'Login successful', user: payload });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function logoutUser(req, res) {
  authService.clearTokenCookie(res);
  res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
  loginUser,
  logoutUser
};
