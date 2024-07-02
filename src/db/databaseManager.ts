import mongoose from "mongoose";
// protocol:// + username:password@cluster-url/database?retryWrites=true&w=majority
const uri = "mongodb+srv://ewjeon:doiAwDjOHuSfDf4p@cluster0.vnq3j1u.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";
import User from "./schemas/user";
import Todo from "./schemas/todo";
import { SNS_TYPE } from "../types/user";

export default class DatabaseManager {
  constructor() {
    this.connect();
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));
  }

  async connect() {
    try {
      await mongoose.connect(uri, {
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true
        }
      });
      await mongoose.connection.db.admin().command({ ping: 1 });
    } catch (error) {
      console.log(error);
      await mongoose.disconnect();
    }
  }

  async disconnet() {
    mongoose.disconnect();
  }

  async saveUser(_id: string, email: string, sns_type: SNS_TYPE, name: string, profile_picture: string) {
    const objectId = new mongoose.Types.ObjectId(_id);
    const user = new User({
      _id: objectId,
      email: email,
      sns_type: sns_type,
      name: name,
      profile_picture: profile_picture
    });

    const result = await user.save();
    if (result === user) {
      return 'USER] Save data successfully';
    } else {
      throw 'USER] Failed to save data';
    }
  }

  async findOneUser(_id: string) {
    const result = await User.findById(_id).exec();
    console.log(result);
    return result;
  }

  async updateUser() {

  }

  async deleteUser() {

  }

  async saveTodo(user_id: string, title: string, desc: string) {
    const todo = new Todo({
      user_id: user_id,
      title: title,
      description: desc,
      status: 'pending'
    });

    const result = await todo.save();
    if (result === todo) {
      return 'TODO] Save data successfully';
    } else {
      throw 'TODO] Failed to save data';
    }
  }

  async findAllTodoByUserId(user_id: string) {
    const result = await Todo.find({ user_id: user_id }).exec();
    return result;
  }

  async updateTodo(id: string, title: string, desc: string) {
    const result = await Todo.updateOne({ _id: id }, { title: title, description: desc }, { upsert: false }).exec();

    if (true === result.acknowledged && 1 === result.modifiedCount) {
      return 'TODO] Update data successfully';
    } else {
      throw new Error('TODO] Failed to update data');
    }
  }

  async updateStatus(id: string, status: string) {
    const result = await Todo.updateOne({ _id: id }, { status: status }, { upsert: false }).exec();

    if (true === result.acknowledged && 1 === result.modifiedCount) {
      return 'TODO] Update status successfully';
    } else {
      throw new Error('TODO] Failed to update status');
    }
  }

  async deleteTodoById(id: string) {
    const result = await Todo.deleteOne({ _id: id }).exec();

    if (true === result.acknowledged && 1 === result.deletedCount) {
      return 'TODO] Delete data successfully';
    } else {
      throw new Error('TODO] Failed to delete data');
    }
  }
}
