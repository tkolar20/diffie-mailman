export interface Email {
    id?: number;
    sender_id: number;
    receiver_id: number;
    subject: string;
    body: string;
    seen: boolean;
}