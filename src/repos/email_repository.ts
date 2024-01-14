export class EmailRepository {
    static async createMail(senderEmail: string, receiverEmail: string, subject: string, body:string): Promise<void> {
        return new Promise((resolve, reject) => {
            
        });
    }
}