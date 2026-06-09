import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookNotificationService {
  private readonly logger = new Logger(WebhookNotificationService.name);

  async processIncomingNotification(payload: any): Promise<boolean> {
    this.logger.log(`📦 Webhook reçu (pas de stockage) : ${JSON.stringify(payload)}`);
    // ✅ On ne fait absolument rien d'autre
    return true;
  }
}
