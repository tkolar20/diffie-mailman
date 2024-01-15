import { Email } from "../models/email.js";
import { EmailBox } from "../models/email_box.js";
import { DataContext } from "./data_context.js";
import { UserRepository } from "./user_repository.js";

export class EmailRepository
{
    static async createMail(senderEmail: string, receiverEmail: string, subject: string, body: string): Promise<EmailBox>
    {
        return new Promise(async (resolve, reject) =>
        {

            let sender = await UserRepository.getUserByEmail(senderEmail);
            let receiver = await UserRepository.getUserByEmail(receiverEmail);
            if(receiver == null)
            {
                resolve(null);
            }
            DataContext.context.run('INSERT INTO Email (SenderID, ReceiverID, Subject, Body, Seen) VALUES(?, ?, ?, ?, 0)', [ sender.UserID, receiver.UserID, subject, body ], (err) =>
            {
                if(err) reject(err.message);
                const email: EmailBox = {
                    senderMail: senderEmail,
                    receiverMail: receiverEmail,
                    body: body,
                    subject: subject,
                    seen: false
                };
                resolve(email);
            });
        });
    }

    static async getMailByEmail(email: string): Promise<Array<EmailBox>>
    {
        return new Promise(async (resolve, reject) =>
        {
            let user = await UserRepository.getUserByEmail(email);
            if(user == null)
            {
                resolve(null);
            }
            DataContext.context.all<Email>("SELECT EmailID, SenderID, ReceiverID, Subject, Body, Seen FROM Email WHERE ReceiverID = ?", [ user.UserID ], async (err, rows) =>
            {
                if(err) reject(err.message);
                let emails: Array<EmailBox> = [];
                if(rows.length != 0)
                {
                    // rows.forEach(async element => {
                    //     console.log(element.Subject);
                    //     let sender = await UserRepository.getUserById(element.SenderID);
                    //     let mail: EmailBox = {
                    //         senderMail: sender.Email,
                    //         receiverMail: email,
                    //         subject: element.Subject,
                    //         body: element.Body,
                    //         seen: element.Seen
                    //     };
                    //     emails.push(mail);
                    //     if (!element.Seen) {
                    //         DataContext.context.run("UPDATE Email SET Seen = 1 WHERE EmailID = ?", [element.EmailID], (err) => {
                    //             if (err) reject(err.message);
                    //         });
                    //     }
                    // });
                    for(let i = 0; i < rows.length; i++)
                    {
                        let sender = await UserRepository.getUserById(rows[ i ].SenderID);
                        let mail: EmailBox = {
                            id: rows[ i ].EmailID,
                            senderMail: sender.Email,
                            receiverMail: email,
                            subject: rows[ i ].Subject,
                            body: rows[ i ].Body,
                            seen: rows[ i ].Seen
                        };
                        emails.push(mail);
                        if(!rows[ i ].Seen)
                        {
                            DataContext.context.run("UPDATE Email SET Seen = 1 WHERE EmailID = ?", [ rows[ i ].EmailID ], (err) =>
                            {
                                if(err) reject(err.message);
                            });
                        }
                    }
                    resolve(emails);
                }
                else
                {
                    resolve(null);
                }
            });
        });
    }
}