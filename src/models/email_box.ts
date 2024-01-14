export interface EmailBox {
    id?: number;
    senderMail: string;
    receiverMail: string;
    subject: string;
    body: string;
    seen: boolean;
}