import http from "http";
import { WebSocketServer } from "ws";
import crypto from "crypto";
import { ClientPubKey } from "./interfaces/IData.js";
import sqlite3 from "sqlite3";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import express from "express";
import AuthRouter from "./routes/Auth.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

app.use(cors());
app.use("/api", AuthRouter);

const PORTREACT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database('db/main.db', sqlite3.OPEN_READWRITE, (err) =>
{
    if(err) return console.error(err.message);
    console.log("Connected to database!");
});

db.serialize(() =>
{
    const initSQL = fs.readFileSync("db/init.sql").toString().split(');');
    db.run('PRAGMA foreign_keys=ON;');
    // db.run('BEGIN TRANSACTION;');
    initSQL.forEach((query =>
    {
        if(query)
        {
            // db.run('BEGIN TRANSACTION;');
            console.log(query);
            query += ");";
            db.run(query, (err) =>
            {
                if(err) throw err;
            });
        }
        // db.run("COMMIT;");
    }));
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
        let clientData: ClientPubKey = JSON.parse(data.toString());
        if("publickey" in clientData)
        {
            const sharedKey = serverDH.computeSecret(clientData.publickey, 'base64', 'base64');
            console.log("Shared secret:" + sharedKey);
            const aesKey = crypto.createHash('sha256').update(sharedKey).digest();
        }
    });
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORTREACT, () =>
{
    console.log(`Server is running on http://localhost:${ PORTREACT }`);
});

const PORT = 4000;
server.listen(PORT, () =>
{
    console.log(`Server listening on port ${ PORT }`);
});
