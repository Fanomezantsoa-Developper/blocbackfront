export declare class WebhookNotification {
    id: string;
    type: string;
    motif: string;
    patientId: string;
    sourceServiceId: string;
    sourceServiceName: string;
    targetServiceId: string;
    targetServiceName: string;
    urgence: number;
    payload: any;
    channels: string[];
    processed: boolean;
    receivedAt: Date;
}
