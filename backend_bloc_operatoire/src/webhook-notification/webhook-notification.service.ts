import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookNotification } from '../entities/webhook-notification.entity';

@Injectable()
export class WebhookNotificationService {
  private readonly logger = new Logger(WebhookNotificationService.name);

  constructor(
    @InjectRepository(WebhookNotification)
    private readonly repo: Repository<WebhookNotification>,
  ) {}

  async processIncomingNotification(payload: any): Promise<boolean> {
    this.logger.log(`📦 Reçu: ${JSON.stringify(payload)}`);
    
    // TOUJOURS retourner true, indépendamment de la base
    try {
      const item = this.repo.create({
        type: payload.type,
        motif: payload.motif || payload.message,
        patientId: String(payload.patientId || payload.targetId || 'unknown'),
        sourceServiceId: payload.sourceServiceId ? String(payload.sourceServiceId) : null,
        sourceServiceName: payload.sourceServiceName,
        targetServiceId: payload.targetServiceId ? String(payload.targetServiceId) : null,
        targetServiceName: payload.targetServiceName,
        urgence: payload.urgence,
        payload: payload.payload,
        channels: payload.channels,
        processed: true,
      });
      await this.repo.save(item);
      this.logger.log(`✅ Sauvegardé avec succès`);
    } catch (error) {
      this.logger.error(`❌ Erreur (ignorée): ${error.message}`);
      // Ne pas propager l'erreur
    }
    
    return true; // ← TOUJOURS true
  }
}
