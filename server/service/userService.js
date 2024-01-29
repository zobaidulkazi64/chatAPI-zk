// services/userService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



class UserService {
  async createUser(username, email, password, agreeTerms) {
    try {
      
      if (!username || !email || !password || typeof agreeTerms !== 'boolean') {
        throw new Error('Invalid input. Please provide valid data.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        agreeTerms,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }


  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }


  async updateUserById(id, updatedUserData) {
    try {
      // Additional validation logic if needed

      // Check if the email is being updated and ensure it's unique
      if (updatedUserData.email) {
        const existingUser = await User.findOne({ email: updatedUserData.email });
        if (existingUser && existingUser._id.toString() !== id) {
          throw new Error('Email is already in use. Please choose another email.');
        }
      }

      // Hash the updated password before storing it
      if (updatedUserData.password) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }


  async deleteUserById(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error('User not found');
      }



      return { message: 'User deleted successfully' };
    } catch (error) {
      throw error;
    }
  }


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


}

module.exports = new UserService();
