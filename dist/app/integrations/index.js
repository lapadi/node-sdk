"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
const InstagramService_1 = require("./InstagramService");
class IntegrationService {
    constructor(config) {
        this.instagram = new InstagramService_1.InstagramIntegration(config);
    }
}
exports.IntegrationService = IntegrationService;
