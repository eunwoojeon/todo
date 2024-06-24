// --- SERVER ---
// node.js 함수로 외부 모듈 import
import express, {NextFunction, Request, Response} from "express";
import path from "path";

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
    // const reqTest1 = req.query.req;
    // const reqTest2 = req.params.req;
    // console.log("req test1 : " + reqTest1);
    // console.log("req test2 : " + reqTest2);
    res.send("test 성공?");
  })
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

server.route('/todo')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

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

async function insertTest() {
  const before = await User.findOneAndDelete({ sns_id: 'wjs***' });

  const user = new User({
    sns_id: 'wjs***',
    sns_type: 'google',
    email: 'wjs***@***',
    name: 'ew***'
  });
  await user.save();

  const after = await User.findOne({ sns_id: 'wjs***' });

  console.log(`before: ${before},\nafter: ${after}`);
};

insertTest();


function saveUser() {

}

function findOneUser() {

}

function updateUser() {

}

function deleteUser() {

}

const saveTodo = () => {

}

const findAllTodo = () => {

}

const updateTodo = () => {

}

const deleteTodo = () => {

}