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
      // N'utiliser que les colonnes qui existent dans l'entité
      const notification = new NotificationCPA();
      notification.heurePrescription = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      notification.patientId = payload.patientId || payload.targetId || 'webhook-inconnu';
      notification.intervention = payload.motif || payload.message || 'Notification externe';
      notification.chirurgienId = payload.sourceServiceId || payload.chirurgienId || null;
      notification.professeurCPA = payload.sourceServiceName || sourceService || 'Service externe';
      notification.estUrgent = payload.urgence === 3 || payload.estUrgent === true;
      notification.statut = StatutNotificationCPA.EN_ATTENTE;

      await this.notificationRepo.save(notification);
      this.logger.log(`✅ Notification externe stockée en base (ID: ${notification.id})`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Erreur stockage: ${error.message}`);
      // On retourne quand même true pour que le service externe ne soit pas bloqué
      return true;
    }
  }
}
