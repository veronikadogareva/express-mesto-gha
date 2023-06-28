const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});
const User = mongoose.model('user', userSchema);
module.exports = User;