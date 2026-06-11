export declare class WebhookNotificationService {
    private readonly logger;
    processIncomingNotification(payload: any, sourceService?: string): Promise<boolean>;
}
