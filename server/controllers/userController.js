// controllers/userController.js
const User = require('../models/userModel');
const userService = require('../service/userService');

class UserController {

  async createUser(req, res) {
    const { username,email, password, agreeTerms } = req.body;


    if (!username || !email || !password || typeof agreeTerms !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input. Please provide valid data.' });
    }
    console.log(username,email, password, agreeTerms)

    try {
      const newUser = await userService.createUser(username,email, password, agreeTerms);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

   async getUserById(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      next(error)
    }
  }
  

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  async updateUserById(req, res, next) {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
      const updatedUser = await userService.updateUserById(userId, updatedUserData);

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async deleteUserById(req, res, next) {
    const userId = req.params.id;

    try {
      const deletedUser = await userService.deleteUserById(userId);

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  

}

module.exports = new UserController();
