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
      // Créer une notification interne à partir du webhook
      const newNotification = this.notificationRepo.create({
        heurePrescription: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        patientId: payload.patientId || payload.targetId || 'webhook-inconnu',
        intervention: payload.motif || payload.message || 'Notification externe',
        chirurgienId: payload.sourceServiceId || payload.chirurgienId || null,
        professeurCPA: payload.sourceServiceName || sourceService || 'Service externe',
        estUrgent: payload.urgence === 3 || payload.estUrgent === true,
        statut: StatutNotificationCPA.EN_ATTENTE,
      });

      await this.notificationRepo.save(newNotification);
      this.logger.log(`✅ Notification externe stockée en base (ID: ${newNotification.id})`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Erreur stockage: ${error.message}`);
      return false;
    }
  }
}
