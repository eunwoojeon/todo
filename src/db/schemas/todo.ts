import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey : false
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
