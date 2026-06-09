import { Module } from '@nestjs/common';
import { WebhookNotificationController } from './webhook-notification.controller';
import { WebhookNotificationService } from './webhook-notification.service';

@Module({
  controllers: [WebhookNotificationController],
  providers: [WebhookNotificationService],
})
export class WebhookNotificationModule {}
