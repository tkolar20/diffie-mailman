-- Drop tables if they exist
DROP TABLE IF EXISTS Email;
DROP TABLE IF EXISTS Mailbox;
DROP TABLE IF EXISTS User;

-- User Table
CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

-- Mailbox Table
CREATE TABLE IF NOT EXISTS Mailbox (
    MailboxID INT PRIMARY KEY,
    UserID INT,
    Name VARCHAR(255) NOT NULL,
    TotalEmails INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Email Table
CREATE TABLE IF NOT EXISTS Email (
    EmailID INT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    Subject VARCHAR(255),
    Body TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES User(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES User(UserID)
);

-- Insert sample data into User table
INSERT INTO User (UserID, Username, Password, Email)
VALUES 
    (1, 'john_doe', 'password123', 'john.doe@example.com'),
    (2, 'jane_smith', 'securepass', 'jane.smith@example.com');

-- Insert sample data into Mailbox table
INSERT INTO Mailbox (MailboxID, UserID, Name, TotalEmails)
VALUES 
    (1, 1, 'Inbox', 2),
    (2, 1, 'Sent', 1),
    (3, 2, 'Inbox', 3);

-- Insert sample data into Email table
INSERT INTO Email (EmailID, SenderID, ReceiverID, Subject, Body, IsRead)
VALUES 
    (1, 1, 2, 'Meeting Tomorrow', 'Hi Jane, let's discuss the project tomorrow.'),
    (2, 2, 1, 'Re: Meeting Tomorrow', 'Sure, John! Looking forward to it.'),
    (3, 1, 2, 'Project Update', 'Jane, here is the latest update on the project.');