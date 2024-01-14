import { sqlite3, Database, RunResult } from "sqlite3";
import { DataContext } from "./data_context.js";
import { User } from "../models/user.js";

export class UserRepository {


    createUser(username: string, password: string, email: string): User {
        const user = {
            Username: username,
            Password: password,
            Email: email
        };
        DataContext.context.run('INSERT INTO User (username, password, email) VALUES(?, ?, ?)', [username, password, email],  (err) => {
            if (err) console.log(err.message);
        });
        return user;
    }

    async getUserById(UserID: number): Promise<User> {
        return new Promise((resolve, reject) => {
            DataContext.context.get<User>("SELECT UserID, Username, Password, Email FROM User WHERE UserID = ?", [UserID], (err, row) => {
                if (err) {
                    console.log(err.message);
                    return reject(err.message);
                }
                if (row != null) {
                    return resolve(row);
                }
                else {
                    console.log("get user null");
                    return reject("get user null");
                }
            });
        });
    }
}   