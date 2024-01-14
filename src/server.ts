import http from "http";
import {WebSocketServer} from "ws";
import crypto from "crypto";
import { ClientPubKey } from "./interfaces/IData.js";
import sqlite3 from "sqlite3";
import fs from "fs";
import { DataContext } from "./repos/data_context.js";
import { UserRepository } from "./repos/user_repository.js";

const server = http.createServer();
const wss = new WebSocketServer({server:server});

// const db = new sqlite3.Database('db/main.db', sqlite3.OPEN_READWRITE, (err) =>
// {
//   if(err) return console.error(err.message);
//   console.log("Connected to database!");
// });

DataContext.initDb();

// db.serialize(() =>
// {
//   const initSQL = fs.readFileSync("db/init.sql").toString().split(';');
//   db.run('PRAGMA foreign_keys=ON;');
//   // db.run('BEGIN TRANSACTION;');
//   initSQL.forEach((query =>
//     {
//       if(query)
//       {
//         db.run('BEGIN TRANSACTION;');
//         query += ";";
//         console.log(query);
//         db.run(query, (err) =>
//         {
//           if(err) throw err;
//         });
//         db.run("COMMIT;");
//       }
//     }));
// });

const repo: UserRepository = new UserRepository();
const create = repo.createUser("test", "test", "testdm.com");
const user = repo.getUserById(1).then((user) => {
  console.log(user.Email);
});

wss.on('connection', ws => 
{
    const tempDH = crypto.createDiffieHellman(512);
    const tempPrime = tempDH.getPrime('base64');

    const serverDH = crypto.createDiffieHellman(tempPrime, 'base64');
    const serverPubKey = serverDH.generateKeys('hex');
    ws.send(JSON.stringify({
        "prime": tempPrime,
        "publickey": serverPubKey,
        "generator": serverDH.getGenerator('base64'),
      }));
    ws.once("message", data =>
    {
      let clientData:ClientPubKey = JSON.parse(data.toString());
      if("publickey" in clientData)
      {
        const sharedKey = serverDH.computeSecret(clientData.publickey, 'base64', 'base64');
        console.log("Shared secret:" + sharedKey);
      }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
