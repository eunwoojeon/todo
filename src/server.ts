// --- SERVER ---
// node.js 함수로 외부 모듈 import
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import DatabaseManager from './db/databaseManager';
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

const dbmanager = new DatabaseManager();

// port 4000에서 server 실행 및 callback
server.listen(server.get("port"), () => {
  console.log(server.get("port"), "번 포트에서 대기중.."); // callback
});

process.once('SIGINT', async () => {
  console.log('mongoDB disconnecting');
  await dbmanager.disconnet();
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

// server.post('user/signup', async (req: Request, res: Response) => {
//   try {
//     const decodedToken = jwt.decode(req.body.token);
//     // const msg = await dbmanager.saveUser(decodedToken.sub, decodedToken.email, 'GOOGLE', decodedToken.);
//     res.status(200).json(decodedToken);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.stack);
//       res.status(500).json(err.message);
//     }
//   }
// })

server.post('user/signin', async (req: Request, res: Response) => {
  try {
    const decodedToken = jwt.decode(req.body.token);
    // const msg = await dbmanager.saveUser(decodedToken.sub, decodedToken.email, 'GOOGLE', decodedToken.);
    res.status(200).json(decodedToken);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).json(err.message);
    }
  }
})

server.route('/todo')
  .get(async (req: Request, res: Response) => {
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