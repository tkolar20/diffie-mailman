import sqlite3 from "sqlite3";
import fs from "fs";

export class DataContext {
    static context = new sqlite3.Database('db/main.db', sqlite3.OPEN_READWRITE, (err) =>
    {
      if(err) return console.error(err.message);
      console.log("Connected to database!");
    });

    static async initDb(): Promise<void> {
        return new Promise((resolve, reject) => {
            DataContext.context.serialize(() =>
            {
              const initSQL = fs.readFileSync("db/init.sql").toString().split(';');
              // db.run('BEGIN TRANSACTION;');
              initSQL.forEach((query =>
                {
                  if(query)
                  {
                    DataContext.context.run('BEGIN TRANSACTION;');
                    DataContext.context.run('PRAGMA foreign_keys=ON;');
                    query += ";";
                    console.log(query);
                    DataContext.context.run(query, (err) =>
                    {
                      if(err) reject(err.message);
                    });
                    DataContext.context.run("COMMIT;");
                  }
                  // db.run("COMMIT;");
                }));
            });
          resolve();  
        });
    }
}