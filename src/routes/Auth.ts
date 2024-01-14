import {Request, Router, NextFunction} from "express"
import { LoginData } from "../interfaces/IData.js";
import { errorHandler } from "../routes/middleware/ErrorHandler.js"
var router = Router();

router.post("/login", async(req:Request<unknown, unknown, LoginData, unknown>, res, next) =>
{
    const {username, password} = req.body;
    try
    {
        if(!(username|| password))
        {
            throw {status: 400, message: "Username and passowrd must be supplied!"};
        }
        // check if exists
    }
    catch(err)
    {
        next(err);
    }
});

router.post("/register", async(req:Request<unknown, unknown, LoginData, unknown>, res, next) =>
{
    const {username, password} = req.body;
    try
    {
        if(!(username|| password))
        {
            throw {status: 400, message: "Username and passowrd must be supplied!"};
        }
        // let the user in
    }
    catch(err)
    {
        next(err);
    }
});

router.use(errorHandler);

export default router;
