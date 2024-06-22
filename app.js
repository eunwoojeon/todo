// --- SERVER ---
// node.js 함수로 외부 모듈 import
const express = require("express");
const path = require("path");

const app = express();
const port = 4000;

app.set("port", port); // express에 port=4000 setting

// express.static(root) : 정적 파일(css, js, image) 제공 경로 지정
// - 현재 폴더의 절대경로(__dirname)
// - ex) http://localhost:4000/ === __dirname/todo_app/build/
app.use(express.static(path.join(__dirname, "todo_app/build")));

// get("/") 요청에 대한 응답
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/todo_app/build/index.html"));
});

// port 4000에서 server 실행 및 callback
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중.."); // callback
});

process.once('SIGINT', async () => {
  console.log('mongoDB disconnecting');
  await disconn();
  process.exit(0);
});



// --- DB ---
const mongoose = require('mongoose');
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
    (await mongoose.connect(uri, clientOptions));
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

const User = require('./schemas/user');
async function insertTest () {
  const user = new User({
    google_id: 'wjs***',
    email: 'wjs***@***',
    name: 'ew***'
  });
  console.log(user);
  await user.save();
  const Users = await User.find();
  console.log(Users);
};

insertTest();