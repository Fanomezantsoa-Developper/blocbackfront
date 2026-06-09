import { Repository } from 'typeorm';
import { WebhookNotification } from '../entities/webhook-notification.entity';
export declare class WebhookNotificationService {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<WebhookNotification>);
    processIncomingNotification(payload: any): Promise<boolean>;
}
