import { Request, Router, NextFunction } from "express";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { AuthData } from "../interfaces/IData.js";
import { EmailRepository } from "../repos/email_repository.js";
import { UserRepository } from "../repos/user_repository.js";
import crypto from "crypto";
const router = Router();

router.get("/", async (req, res, next) =>
{
    try
    {
        const sender = req.query.email;
        const emails = await EmailRepository.getMailByEmail(sender as string);
        //res.json(emails);
        const temp = await UserRepository.getKeyByEmail(sender as string);
        const aesKey = Buffer.from(temp, 'hex');
        const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, "aaaaaaaaaaaaaaaa");
        await emails.forEach(mail =>
        {
            const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, "aaaaaaaaaaaaaaaa");
            let encrypted = cipher.update(mail.body, 'utf8', 'binary');
            encrypted += cipher.final('binary');
            mail.body = encrypted;
        });
        await res.json(emails);
    }
    catch(err)
    {
        next(err);
    }
});

router.get("/:id", async (req, res, next) =>
{
    try
    {
        const mailID = req.params.id;
        const sender = req.body;
    }
    catch(err)
    {
        next(err);
    }
});

router.post("/", async (req, res, next) =>
{
    try
    {
        console.log("Here.");
        const { sender, destination, subject, content, tag } = req.body;
        const temp = await UserRepository.getKeyByEmail(sender as string);
        const aesKey = Buffer.from(temp, 'hex');
        const cipher = crypto.createDecipheriv("aes-256-gcm", aesKey, "aaaaaaaaaaaaaaaa");
        cipher.setAuthTag(Buffer.from(tag, 'hex'));
        console.log(content);
        let decrypted = cipher.update(content, 'hex', 'utf8');
        decrypted += cipher.final('utf8');
        console.log(decrypted.toString());
        res.json(await EmailRepository.createMail(sender, destination, subject, decrypted));
    }
    catch(err)
    {
        console.log(err);
    }
});

router.delete("/:id", async (req, res, next) =>
{
    try
    {
        const mailID = req.params.id;
        const sender = req.body;
    }
    catch(err)
    {
        next(err);
    }
});

router.use(errorHandler);

export default router;
