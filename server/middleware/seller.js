const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



const sellerMiddleware = async (req, res, next) => {
    
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });

        } else {
            const decoded = jwt.verify(token, 'your-secret-key');
            const user = await User.findById(decoded.userId);
            if (user) {
                if (user.role === 'seller') {
                    next();
                } else {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
        }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = sellerMiddleware