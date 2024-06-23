import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  sns_id: {
    type: String,
    required: true,
    unique: true
  },
  sns_type: {
    type: String,
    required: true
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
export default User;