import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationCPA } from '../entities/notification-cpa.entity';
import { WebhookNotification } from '../entities/webhook-notification.entity';
import { NotificationCPAService } from './notification-cpa.service';
import { NotificationCPAController } from './notification-cpa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationCPA, WebhookNotification])],
  controllers: [NotificationCPAController],
  providers: [NotificationCPAService],
  exports: [NotificationCPAService],
})
export class NotificationCPAModule {}
