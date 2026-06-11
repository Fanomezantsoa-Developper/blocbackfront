import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookNotificationService {
  private readonly logger = new Logger(WebhookNotificationService.name);

  async processIncomingNotification(payload: any, sourceService?: string): Promise<boolean> {
    this.logger.log(`📦 Webhook reçu de ${sourceService || 'source inconnue'} : ${JSON.stringify(payload)}`);
    // ✅ On ne fait rien d'autre → toujours true
    return true;
  }
}
