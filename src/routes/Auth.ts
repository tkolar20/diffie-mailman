import { Request, Router, NextFunction } from "express";
import { LoginData, RegisterData } from "../interfaces/IData.js";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { UserRepository } from "../repos/user_repository.js";
const router = Router();

router.post("/login", async (req: Request<unknown, unknown, LoginData, unknown>, res, next) =>
{
    try
    {
        const { email, password } = req.body;
        if(!(email || password))
        {
            throw { status: 400, message: "Username and passowrd must be supplied!" };
        }
        res.json(await UserRepository.loginUser(email, password));
    }
    catch(err)
    {
        next(err);
    }
});

router.post("/register", async (req: Request<unknown, unknown, RegisterData, unknown>, res, next) =>
{
    try
    {
        const { username, email, password } = req.body;
        if(!(email || password))
        {
            throw { status: 400, message: "Username and passowrd must be supplied!" };
        }
        res.json(await UserRepository.createUser(username, password, email));
    }
    catch(err)
    {
        next(err);
    }
});

router.use(errorHandler);

export default router;
