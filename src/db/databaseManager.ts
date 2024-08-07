import mongoose from "mongoose";
import { SNS_TYPE } from "../types/user";
import TodoModel from "./schemas/todo";
import UserModel from "./schemas/user";
// protocol:// + username:password@cluster-url/database?retryWrites=true&w=majority
const uri = "mongodb+srv://ewjeon:doiAwDjOHuSfDf4p@cluster0.vnq3j1u.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

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

  getMongoose() {
    return mongoose;
  }

  getConnection() {
    return mongoose.connection;
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

  //#region user
  async saveUser(email: string, sns_type: SNS_TYPE, name: string, picture: string) {
    const filter = { email: email };
    const update = {
      sns_type: sns_type,
      name: name,
      picture: picture
    };
    const option = {
      new: true, // 업데이트 성공한 document 반환
      upsert: true // document가 없을 경우 새로 생성
    }

    const result = await UserModel.findOneAndUpdate(filter, update, option);
    if (null !== result) {
      return {
        message: 'USER] Save data successfully',
        userData: {
          isLogin: true,
          _id: result._id.toString(),
          email: result.email,
          name: result.name,
          picture: result.picture
        }
      };
    } else {
      throw new Error('USER] Failed to save data');
    }
  }

  async findOneUser(email: string) {
    const result = await UserModel.findOne({ email: email }).exec();
    if (null !== result) {
      return {
        msg: 'USER] Save find successfully',
        data: { ...result }
      };
    } else {
      throw new Error('USER] Failed to find data');
    }
  }

  async deleteUser(id: string) {
    const result = await UserModel.deleteOne({ _id: id }).exec();
    console.log(result);
    if (true === result.acknowledged && 1 === result.deletedCount) {
      return 'USER] Delete data successfully';
    } else {
      throw new Error('USER] Failed to delete data');
    }
  }

  async transactionalDeleteUser(id: string) {
    const session = await mongoose.startSession(); // session 초기화
    session.startTransaction(); // session start
    try {
      await UserModel.deleteOne({ _id: id }).session(session);
      await TodoModel.deleteMany({ user_id: id }).session(session);
      
      await session.commitTransaction(); // session commit
    } catch (error) {
      await session.abortTransaction(); // session rollback
      throw error
    } finally {
      session.endSession(); // session end
    }
  }
  //#endregion

  //#region todo
  async saveTodo(user_id: string, title: string, desc: string) {
    const todo = new TodoModel({
      user_id: user_id,
      title: title,
      description: desc,
      status: 'PENDING'
    });

    const result = await todo.save();
    if (result === todo) {
      return 'TODO] Save data successfully';
    } else {
      throw new Error('TODO] Failed to save data');
    }
  }

  async findAllTodoByUserId(user_id: string) {
    const result = await TodoModel.find({ user_id: user_id }).exec();
    return { message: 'TODO] Find data successfully', todoList: result };
  }

  async updateTodo(id: string, title: string, desc: string) {
    const result = await TodoModel.updateOne({ _id: id }, { title: title, description: desc }, { upsert: false }).exec();

    if (true === result.acknowledged && 1 === result.modifiedCount) {
      return 'TODO] Update data successfully';
    } else {
      throw new Error('TODO] Failed to update data');
    }
  }

  async updateStatus(id: string, isCompleted: boolean) {
    const status = isCompleted ? 'COMPLETE' : 'PENDING';

    const result = await TodoModel.updateOne({ _id: id }, { status: status }, { upsert: false }).exec();
    console.log(result);
    if (true === result.acknowledged && 1 === result.modifiedCount) {
      return 'TODO] Update status successfully';
    } else {
      throw new Error('TODO] Failed to update status');
    }
  }

  async deleteTodoById(id: string) {
    const result = await TodoModel.deleteOne({ _id: id }).exec();

    if (true === result.acknowledged && 1 === result.deletedCount) {
      return 'TODO] Delete data successfully';
    } else {
      throw new Error('TODO] Failed to delete data');
    }
  }
  //#endregion
}
