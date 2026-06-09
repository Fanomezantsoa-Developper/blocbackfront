import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('webhook_notifications')
export class WebhookNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  motif: string;

  @Column({ name: 'patientId', nullable: true })
  patientId: string;

  @Column({ name: 'sourceServiceId', nullable: true })
  sourceServiceId: string;

  @Column({ name: 'sourceServiceName', nullable: true })
  sourceServiceName: string;

  @Column({ name: 'targetServiceId', nullable: true })
  targetServiceId: string;

  @Column({ name: 'targetServiceName', nullable: true })
  targetServiceName: string;

  @Column({ nullable: true })
  urgence: number;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'text', array: true, nullable: true })
  channels: string[];

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn({ name: 'receivedAt' })
  receivedAt: Date;
}
