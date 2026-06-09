import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationCPA, StatutNotificationCPA } from '../entities/notification-cpa.entity';

@Injectable()
export class WebhookNotificationService {
  private readonly logger = new Logger(WebhookNotificationService.name);

  constructor(
    @InjectRepository(NotificationCPA)
    private readonly notificationRepo: Repository<NotificationCPA>,
  ) {}

  async processIncomingNotification(payload: any, sourceService?: string): Promise<boolean> {
    this.logger.log(`📦 Webhook reçu: ${JSON.stringify(payload)}`);

    try {
      const newNotification = new NotificationCPA();
      newNotification.heurePrescription = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      newNotification.patientId = payload.patientId || payload.targetId || 'webhook-inconnu';
      newNotification.intervention = payload.motif || payload.message || 'Notification externe';
      newNotification.chirurgienId = payload.sourceServiceId || payload.chirurgienId || null;
      newNotification.professeurCPA = payload.sourceServiceName || sourceService || 'Service externe';
      newNotification.estUrgent = payload.urgence === 3 || payload.estUrgent === true;
      newNotification.statut = StatutNotificationCPA.EN_ATTENTE;

      const saved = await this.notificationRepo.save(newNotification);
      this.logger.log(`✅ Notification stockée (ID: ${saved.id})`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Erreur: ${error.message}`);
      return false;
    }
  }
}
