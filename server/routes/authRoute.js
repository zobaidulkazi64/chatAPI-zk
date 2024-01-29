const router = require('express').Router();
const { loginUser, logoutUser} = require('../controllers/authController')
const {authenticateUser} = require('../middleware/authMiddleware');
const {sellerMiddleware} = require('../middleware/seller');

// Login user
router.post('/login', loginUser);

router.post('/logout', logoutUser);
router.get('/dashboard', authenticateUser);


module.exports = router;
