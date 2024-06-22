const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey : false
});

const User = mongoose.model('User', userSchema);
module.exports = User;