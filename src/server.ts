// --- SERVER ---
// node.js 함수로 외부 모듈 import
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import DatabaseManager from './db/databaseManager';

// session
import session from 'express-session';
import mongoStore from 'connect-mongo';

import { GoogleToken } from "./types/user";
import './types/session';

const server = express();
const dbmanager = new DatabaseManager();

// express.static(root) : 정적 파일(css, js, image) 제공 경로 지정
// - 현재 폴더의 절대경로(__dirname)
// - ex) http://localhost:4000/ === __dirname/todo_app/build/
server.use(express.static(path.join(__dirname, "../todo_app/build")));
server.use(bodyParser.json()); // node.js 모듈, request data의 body parse를 자동으로 실행
// session
server.use(session({
  secret: '36484381A3ACF2C7F4D841CB1A5F2', // session id 암호화 키
  resave: false, // 세션의 변화가 없어도 재저장할 것인지
  saveUninitialized: false, // 세션 저장전 uninitialized 상태로 미리 저장할 것인지
  store: mongoStore.create({
    mongoUrl: 'mongodb+srv://ewjeon:doiAwDjOHuSfDf4p@cluster0.vnq3j1u.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0'
  }), // 세션 저장소
  cookie: { secure: false, maxAge: (1000 * 60 * 60) * 24 } // 세션 만료 시간(24h)
}))
server.use((req: Request, res: Response, next: NextFunction) => { // CORS 방지
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// port 4000에서 server 실행 및 callback
const port = 4000;
server.set("port", port); // express에 port=4000 setting
server.listen(server.get("port"), () => {
  console.log(server.get("port"), "번 포트에서 대기중.."); // callback
});

process.once('SIGINT', async () => {
  console.log('mongoDB disconnecting');
  await dbmanager.disconnet();
  process.exit(0);
});

//#region '/' route
server.get("/", (req: Request, res: Response, next) => {
  res.sendFile(path.join(__dirname, "/todo_app/build/index.html"));
  next();
});
//#endregion

// session
server.get('/checksession', (req: Request, res: Response) => {
  if (req.session && req.session.sub_id) {
    return res.status(200).json({ isLogin: true, sub_id: req.session.sub_id, email: req.session.email, name: req.session.name, picture: req.session.picture });
  }
  return res.status(200).json({ isLogin: false });
});

//#region '/user' route
server.post('/user/login/google', async (req: Request, res: Response) => {
  try {
    const decodedToken = jwt.decode(req.body.token) as GoogleToken;
    const result = await dbmanager.saveUser(decodedToken.sub, decodedToken.email, 'GOOGLE', decodedToken.name, decodedToken.picture);

    // session
    req.session.email = result.data.email;
    req.session.sub_id = result.data.sub_id;
    req.session.name = result.data.name;
    req.session.picture = result.data.picture;
    console.log(req.session);

    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).json(err.message);
    }
  }
})

server.get('/user/logout/google', async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'USER] Logout failed' });
    }
    res.clearCookie('connect.sid');
    console.log(req.session); // undefined!
    return res.status(200).json({ message: 'USER] Logout success' });
  });
});
//#endregion

//#region '/todo' route
server.route('/todo')
  .get(async (req: Request, res: Response) => {
    console.log(req.session);

    try {
      const data = await dbmanager.findAllTodoByUserId(req.query.user_id as string);
      res.status(200).json(['TODO] Find data successfully', data]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).json('TODO] Failed to find data');
      }
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      if ('create' === req.query.write) {
        const msg = await dbmanager.saveTodo(req.body.user_id, req.body.title, req.body.desc);
        res.status(200).json(msg);
      } else if ('update' === req.query.write) {
        const msg = await dbmanager.updateTodo(req.body._id, req.body.title, req.body.desc);
        res.status(200).json(msg);
      } else {
        res.status(500).json('TODO] Invalid parameter');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).json(err.message);
      }
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const msg = await dbmanager.updateStatus(req.query._id as string, req.query.status as string);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).json(err.message);
      }
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const msg = await dbmanager.deleteTodoById(req.query._id as string);
      res.status(200).json(msg);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).json(err.message);
      }
    }
  });
//#endregion