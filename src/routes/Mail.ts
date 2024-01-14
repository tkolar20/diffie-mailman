import { Request, Router, NextFunction } from "express";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { AuthData } from "../interfaces/IData.js";

const router = Router();

router.get("/", async (req: Request<unknown, AuthData, unknown, unknown>, res, next) =>
{
    try
    {
        const sender = req.body;
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
        const { sender, destination, content } = req.body;

    }
    catch(err)
    {
        next(err);
    }
});

router.post("/:id", async (req, res, next) =>
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
