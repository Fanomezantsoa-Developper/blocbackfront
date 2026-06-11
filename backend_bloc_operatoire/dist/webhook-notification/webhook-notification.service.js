"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WebhookNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookNotificationService = void 0;
const common_1 = require("@nestjs/common");
let WebhookNotificationService = WebhookNotificationService_1 = class WebhookNotificationService {
    logger = new common_1.Logger(WebhookNotificationService_1.name);
    async processIncomingNotification(payload, sourceService) {
        this.logger.log(`📦 Webhook reçu de ${sourceService || 'source inconnue'} : ${JSON.stringify(payload)}`);
        return true;
    }
};
exports.WebhookNotificationService = WebhookNotificationService;
exports.WebhookNotificationService = WebhookNotificationService = WebhookNotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], WebhookNotificationService);
//# sourceMappingURL=webhook-notification.service.js.map