// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  agreeTerms: {
    type: Boolean,
    default: false, // Set the default value to false
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
