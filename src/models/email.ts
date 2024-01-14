export interface Email {
    EmailID?: number;
    SenderID: number;
    ReceiverID: number;
    Subject: string;
    Body: string;
    Seen: boolean;
}