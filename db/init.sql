DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Email;
CREATE TABLE IF NOT EXISTS User (
    UserID INTEGER PRIMARY KEY,
    Username TEXT NOT NULL,
    Password TEXT NOT NULL,
    Email TEXT NOT NULL,
    Key TEXT
);
CREATE TABLE IF NOT EXISTS Email (
    EmailID INTEGER PRIMARY KEY,
    SenderID INTEGER,
    ReceiverID INTEGER,
    Subject TEXT,
    Body TEXT,
    Seen BOOLEAN,
    FOREIGN KEY (SenderID) REFERENCES User(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES User(UserID)
);
INSERT INTO 
User (Username, Password, Email) 
VALUES ('Kero', 'kero123', 'kero@dm.com'),
    ('Kolar', 'kolar123', 'kolar@dm.com'),
    ('Hajdi', 'hajdi123', 'hajdi@dm.com'),
    ('Fran', 'fran123', 'fran@dm.com'),
    ('Slava', 'slava123', 'slava@dm.com');
INSERT INTO
Email (SenderID, ReceiverID, Subject, Body, Seen)
VALUES (1, 3, 'Pozdrav s backenda', "hi:)", 0),
    (1, 3, 'test seen aaa', "hi:)", 1),
    (2, 4, 'Pozdrav s backenda', "hello:)", 0),
    (2, 4, 'test seen aaa', "hi:)", 1),
    (1, 5, 'helloooo', "hiiiii", 0),
    (2, 5, 'test seen aaa', "hiiiii", 1),
    (5, 2, 'sdffgdfghdfh', "hiiiii", 0),
    (1, 2, 'test seen aaa', "hiiiii", 1),
    (3, 1, 'bomba', "hiiiii", 0),
    (3, 1, 'test seen aaa', "hiiiii", 1);