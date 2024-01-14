import sqlite3 from "sqlite3";
import fs from "fs";

export class DataContext {
    static context = new sqlite3.Database('db/main.db', sqlite3.OPEN_READWRITE, (err) =>
    {
      if(err) return console.error(err.message);
      console.log("Connected to database!");
    });

     static initDb() {
        DataContext.context.serialize(() =>
        {
          const initSQL = fs.readFileSync("db/init.sql").toString().split(';');
          DataContext.context.run('PRAGMA foreign_keys=ON;');
          // db.run('BEGIN TRANSACTION;');
          initSQL.forEach((query =>
            {
              if(query)
              {
                DataContext.context.run('BEGIN TRANSACTION;');
                console.log(query);
                query += ";";
                DataContext.context.run(query, (err) =>
                {
                  if(err) throw err;
                });
                DataContext.context.run("COMMIT;");
              }
              // db.run("COMMIT;");
            }));
        });
    }
}