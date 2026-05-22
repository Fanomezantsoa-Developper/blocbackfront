import { Repository } from 'typeorm';
import { NotificationCPA } from '../entities/notification-cpa.entity';
import { CreateNotificationCPADto } from './dto/create-notification-cpa.dto';
import { UpdateNotificationCPADto } from './dto/update-notification-cpa.dto';
export declare class NotificationCPAService {
    private repo;
    constructor(repo: Repository<NotificationCPA>);
    create(dto: CreateNotificationCPADto): Promise<NotificationCPA>;
    findAll(page?: number, limite?: number): Promise<{
        data: NotificationCPA[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<NotificationCPA>;
    planifierRDV(id: string, dto: any): Promise<NotificationCPA>;
    update(id: string, dto: UpdateNotificationCPADto): Promise<NotificationCPA>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
