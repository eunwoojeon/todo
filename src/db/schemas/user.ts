import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema.Types;

const userSchema = new mongoose.Schema({
  sub: {
    type: ObjectId,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  sns_type: {
    type: String,
    required: true
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
  versionKey: false
});

const User = mongoose.model('User', userSchema);
export default User;