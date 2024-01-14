import { Request, Router, NextFunction } from "express";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { AuthData } from "../interfaces/IData.js";
import { EmailRepository } from "../repos/email_repository.js";

const router = Router();

router.get("/", async (req: Request<unknown, unknown, AuthData, unknown>, res, next) =>
{
    try
    {
        const sender = req.body.email;
        const emails = await EmailRepository.getMailByEmail(sender);
        res.json(emails);
        /*for(const email of emails)
        {

        }*/
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
        const { sender, destination, subject, content } = req.body;
        res.json(await EmailRepository.createMail(sender, destination, subject, content));
    }
    catch(err)
    {
        next(err);
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