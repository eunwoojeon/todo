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

const mongoose = require('mongoose');
const uri = "mongodb+srv://ewjeon:doiAwDjOHuSfDf4p@cluster0.vnq3j1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);