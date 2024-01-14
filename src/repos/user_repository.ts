import { sqlite3, Database, RunResult } from "sqlite3";
import { DataContext } from "./data_context.js";
import { User } from "../models/user.js";
import { Key } from "../models/key.js";

export class UserRepository {


    static async createUser(username: string, password: string, email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = {
                Username: username,
                Password: password,
                Email: email
            };
            DataContext.context.run('INSERT INTO User (Username, Password, Email) VALUES(?, ?, ?)', [username, password, email],  (err) => {
                if (err) reject(err.message);
                resolve(user);
            });
        });
    }

    static async getKeyByUserId(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            DataContext.context.get<Key>("SELECT Key FROM User WHERE UserID = ?", [id], (err, row) => {
                if (err) reject(err.message);
                if (row != null) {
                    resolve(row.Key);
                }
                else {
                    resolve(null);
                }
            });
        });
    }

    static async updateKey(email: string, key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DataContext.context.serialize(() => {
                DataContext.context.get<User>("SELECT UserID, Username, Password, Email FROM User WHERE Email = ?;", [email], (err, row) => {
                    DataContext.context.run("UPDATE User SET Key = ? WHERE UserID = ?", [key, row.UserID], (err) => {
                        if (err) reject(err.message);
                        resolve();
                    });
                });
            });
        });
    }

    static async getUserById(UserID: number): Promise<User> {
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
                    return resolve(null);
                }
            });
        });
    }

    static async getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            DataContext.context.get<User>("SELECT UserID, Username, Password, Email FROM User WHERE Email = ?", [email], (err, row) => {
                if (err) {
                    console.log(err.message);
                    return reject(err.message);
                }
                if (row != null) {
                    return resolve(row);
                }
                else {
                    console.log("get user null");
                    return resolve(null);
                }
            });
        });
    }

    static async loginUser(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            DataContext.context.get<User>("SELECT UserID, Username, Password, Email FROM User WHERE Email = ? AND Password = ?;", [email, password], (err, row) => {
                if (err) {
                    return reject(err.message);
                }
                if (row != null) {
                    return resolve(row);
                }
                else {
                    return resolve(null);
                }
            })
        });
    }
}   