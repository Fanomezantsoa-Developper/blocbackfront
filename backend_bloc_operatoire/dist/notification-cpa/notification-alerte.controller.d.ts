import { NotificationAlerteService } from './notification-alerte.service';
export declare class NotificationAlerteController {
    private readonly service;
    constructor(service: NotificationAlerteService);
    getAlertes(): Promise<any>;
    getResumeJour(): Promise<any>;
}
