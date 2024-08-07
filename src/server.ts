// --- SERVER ---
// node.js 함수로 외부 모듈 import
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
require('dotenv').config();

import DatabaseManager from './db/databaseManager';

// session
import session from 'express-session';
import MongoStore from 'connect-mongo';

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
  secret: process.env.SESSION_KEY as string, // session id 암호화 키
  resave: false, // 세션의 변화가 없어도 재저장할 것인지
  saveUninitialized: false, // 세션 저장전 uninitialized 상태로 미리 저장할 것인지
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL as string,
  }), // 세션 저장소
  // cookie: { secure: false, maxAge: 1000 * 10}, // 10sec
  cookie: { secure: false, maxAge: (1000 * 60 * 60) * 24 * 365 }, // ms * sec * min * hour * day
  rolling: true // 모든 response가 있을 때마다 세션 만기를 재설정
}))
// CORS 방지
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// session expiration check (session 만료 알림용)
// server.use((req: Request, res: Response, next: NextFunction) => {
//   if (!req.session) {
//     return res.status(401).json({ message: 'SESSION] Session is expired' });
//   }
//   next();
// })

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
  if (req.session && req.session.userId) {
    return res.status(200).json({ isLogin: true, email: req.session.email, name: req.session.name, picture: req.session.picture });
  }
  return res.status(200).json({ isLogin: false });
});

//#region '/user' route
server.route('/user')
  .post(async (req: Request, res: Response) => {
    const decodedToken = jwt.decode(req.body.token) as GoogleToken;
    await dbmanager
      .saveUser(decodedToken.email, 'GOOGLE', decodedToken.name, decodedToken.picture)
      .then((result) => {
        req.session.email = result.userData.email;
        req.session.userId = result.userData._id;
        req.session.name = result.userData.name;
        req.session.picture = result.userData.picture;
        req.session.save();
        console.log(req.session);
        return result;
      })
      .then((result) => {
        const { _id, ...rest } = result.userData;
        res.status(200).json({ message: result.message, isSuccess: true, userData: rest });
      })
      .catch((err) => {
        console.error(err.stack);
        const userData = {
          email: '', name: '', picture: ''
        }
        res.status(500).json({ message: err.message, isSuccess: false, userData: userData });
      });
  })
  .get(async (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ message: 'USER] Logout failed', isSuccess: false });
        }
        res.clearCookie('connect.sid');
        console.log(`Session destroyed: session = ${req.session}`); // undefined!
        return res.status(200).json({ message: 'USER] Logout success', isSuccess: true });
      });

    } else {
      res.status(200).json({ message: 'USER] Session already not exists', isSuccess: true });
    }
  })
  .delete(async (req: Request, res: Response) => {
    if (req.session && req.session.userId) {
      // delete user information
      await dbmanager
        // .deleteUser(req.session.userId)
        .transactionalDeleteUser(req.session.userId)
        .then(() => console.log('User Account Transactional Deleted'))
        .catch((err) => {
          console.error(err.stack);
          res.status(500).json({ message: 'USER] Failed to delete ID', isSuccess: false });
        });

      // session destroy
      req.session.destroy((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ message: 'USER] Logout success', isSuccess: false });
        }
        res.clearCookie('connect.sid');
        console.log(`Session destroyed: session = ${req.session}`); // undefined!
        return res.status(200).json({ message: 'USER] Logout success', isSuccess: true });
      });
    } else {
      res.status(401).json({ message: 'USER] Session does not exist', isSuccess: false });
    }
  })
//#endregion

//#region '/todo' route
server.route('/todo')
  .get(async (req: Request, res: Response) => {
    if (req.session && req.session.userId) {
      await dbmanager
        .findAllTodoByUserId(req.session.userId)
        .then((result) => { res.status(200).json({ message: result.message, isSuccess: true, todoList: result.todoList }) })
        .catch((err) => {
          console.error(err.stack);
          res.status(500).json({ message: 'TODO] Failed to find data', isSuccess: false, todoList: [] });
        });

    } else {
      res.status(401).json({ message: 'TODO] Session does not exist', isSuccess: false, todoList: [] });
    }
  })
  .post(async (req: Request, res: Response) => {
    if (req.session && req.session.userId) {
      switch (req.query.case) {
        case 'create':
          await dbmanager
            .saveTodo(req.session.userId, req.body.title, req.body.desc)
            .then((msg) => { res.status(200).json({ message: msg, isSuccess: true }) })
            .catch((err) => {
              console.error(err.stack);
              res.status(500).json({ message: err.message, isSuccess: false });
            });
          break;

        case 'update':
          await dbmanager
            .updateTodo(req.body.todoId, req.body.title, req.body.desc)
            .then((msg) => { res.status(200).json({ message: msg, isSuccess: true }) })
            .catch((err) => {
              console.error(err.stack);
              res.status(500).json({ message: err.message, isSuccess: false });
            });
          break;

        case 'status':
          await dbmanager
            .updateStatus(req.body.todoId, req.body.status)
            .then((msg) => { res.status(200).json({ message: msg, isSuccess: true }) })
            .catch((err) => {
              console.error(err.stack);
              res.status(500).json({ message: err.message, isSuccess: false });
            });
          break;

        default:
          res.status(500).json({ message: 'TODO] Invalid parameter', isSuccess: false });
          break;
      }

    } else {
      res.status(401).json({ message: 'TODO] Session does not exist', isSuccess: false });
    }
  })
  .put(async (req: Request, res: Response) => {
    if (req.session && req.session.userId) {
      await dbmanager
        .updateStatus(req.body.todoId, req.body.status)
        .then((msg) => { res.status(200).json({ message: msg, isSuccess: true }) })
        .catch((err) => {
          console.error(err.stack);
          res.status(500).json({ message: err.message, isSuccess: false });
        });

    } else {
      res.status(401).json({ message: 'TODO] Session does not exist', isSuccess: false });
    }
  })
  .delete(async (req: Request, res: Response) => {
    if (req.session && req.session.userId) {
      await dbmanager
        .deleteTodoById(req.query.todoId as string)
        .then((msg) => { res.status(200).json({ message: msg, isSuccess: true }) })
        .catch((err) => {
          console.error(err.stack);
          res.status(500).json({ message: err.message, isSuccess: false });
        });

    } else {
      res.status(401).json({ message: 'TODO] Session does not exist', isSuccess: false });
    }
  });
//#endregion