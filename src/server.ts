// --- SERVER ---
// node.js 함수로 외부 모듈 import
import express, { NextFunction, Request, Response } from "express";
import path, { resolve } from "path";
import bodyParser from "body-parser";

const server = express();
const port = 4000;

server.set("port", port); // express에 port=4000 setting

// CORS 방지 : localhost:5000에 한해서 리소스 요청을 허용함
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// express.static(root) : 정적 파일(css, js, image) 제공 경로 지정
// - 현재 폴더의 절대경로(__dirname)
// - ex) http://localhost:4000/ === __dirname/todo_app/build/
server.use(express.static(path.join(__dirname, "../todo_app/build")));
server.use(bodyParser.json()); // node.js 모듈, request data의 body parse를 자동으로 실행
server.use((req: Request, res: Response, next: NextFunction) => { // CORS 방지
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// port 4000에서 server 실행 및 callback
server.listen(server.get("port"), () => {
  console.log(server.get("port"), "번 포트에서 대기중.."); // callback
});

process.once('SIGINT', async () => {
  console.log('mongoDB disconnecting');
  await disconn();
  process.exit(0);
});

server.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/todo_app/build/index.html"));
});

server.route('/user')
  .get((req: Request, res: Response) => {
    res.send("test 성공?");
  })
  .post((req: Request, res: Response) => { })
  .put((req: Request, res: Response) => { })
  .delete((req: Request, res: Response) => { });

server.route('/todo')
  .get(async (req: Request, res: Response) => {
    try {
      const data = await findAllTodoByUserId(req.query.user_id as string);
      res.status(200).json(['TODO] Find data successfully', data]);
    } catch (err: any) {
      console.error(err.stack);
      res.status(500).json('TODO] Failed to find data');
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const msg = await saveTodo(req.body.user_id, req.body.title, req.body.desc);
      res.status(200).json(msg);
    } catch (err: any) {
      console.error(err.stack);
      res.status(500).json(err.message);
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const msg = await updateStatus(req.query._id as string, req.query.status as string);
    } catch (err: any) {
      console.error(err.stack);
      res.status(500).json(err.message);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const msg = await deleteTodoById(req.query._id as string);
      res.status(200).json(msg);
    } catch (err: any) {
      console.error(err.stack);
      res.status(500).json(err.message);
    }
  });

server.post('/todo/edit', async (req: Request, res: Response) => {
  try {
    const msg = await updateTodo(req.body._id, req.body.title, req.body.desc);
    res.status(200).json(msg);
  } catch (err: any) {
    console.error(err.stack);
    res.status(500).json(err.message);
  }
})

// --- DB ---
import mongoose from "mongoose";
// protocol:// + username:password@cluster-url/database?retryWrites=true&w=majority
const uri = "mongodb+srv://ewjeon:doiAwDjOHuSfDf4p@cluster0.vnq3j1u.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

async function conn() {
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

async function disconn() {
  await mongoose.disconnect();
}

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

conn()
  .catch(console.dir);


import User from "./schemas/user";
import Todo from "./schemas/todo";

function saveUser() {

}

function findOneUser() {

}

function updateUser() {

}

function deleteUser() {

}

const saveTodo = async (user_id: string, title: string, desc: string): Promise<string> => {
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

const findAllTodoByUserId = async (user_id: string) => {
  const result = await Todo.find({ user_id: user_id });
  return result;
}

const updateTodo = async (id: string, title: string, desc: string) => {
  const result = await Todo.updateOne({ _id: id }, { title: title, description: desc }, { upsert: false });

  if (true === result.acknowledged && 1 === result.modifiedCount) {
    return 'TODO] Update data successfully';
  } else {
    throw new Error('TODO] Failed to update data');
  }
}

const updateStatus = async (id: string, status: string) => {
  const result = await Todo.updateOne({ _id: id }, { status: status }, { upsert: false });

  if (true === result.acknowledged && 1 === result.modifiedCount) {
    return 'TODO] Update status successfully';
  } else {
    throw new Error('TODO] Failed to update status');
  }
}

const deleteTodoById = async (id: string) => {
  const result = await Todo.deleteOne({ _id: id });

  if (true === result.acknowledged && 1 === result.deletedCount) {
    return 'TODO] Delete data successfully';
  } else {
    throw new Error('TODO] Failed to delete data');
  }
}