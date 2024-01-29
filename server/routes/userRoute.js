const router = require('express').Router();
const {createUser, getUserById, getAllUsers, updateUserById, deleteUserById} = require('../controllers/userController');

// Create a new user
router.post('/createUser', createUser);

// Get user 
router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);



// Update user by ID
router.put('/user/:id', updateUserById);

// Delete user by ID
router.delete('/user/:id', deleteUserById);


module.exports = router;
