import http from "http";
import { WebSocketServer } from "ws";
import crypto from "crypto";
import { ClientPubKey } from "./interfaces/IData.js";
import sqlite3 from "sqlite3";
import fs from "fs";
import { DataContext } from "./repos/data_context.js";
import { UserRepository } from "./repos/user_repository.js";
import { EmailRepository } from "./repos/email_repository.js";
import { User } from "./models/user.js";
import { EmailBox } from "./models/email_box.js";

import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import express from "express";
import AuthRouter from "./routes/Auth.js";
import MailRouter from "./routes/Mail.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

app.use(cors());
app.use("/api", AuthRouter);
app.use("/api/mail", MailRouter);

const PORTREACT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await DataContext.initDb();


UserRepository.getUserByEmail("kolar@dm.com").then((res) =>
{
    if(res != null) console.log(res.Password);
    EmailRepository.getMailByEmail(res.Email).then((res) =>
    {
        if(res != null)
        {
            res.forEach(element =>
            {
                console.log(element.subject);
            });
        }
        else
        {
            console.log("ZASTO SI NULL");
        }
    });

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
