import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema.Types;

const userSchema = new mongoose.Schema({
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
  picture: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;