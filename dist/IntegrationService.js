"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
class IntegrationService {
    constructor(config) {
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_id = config.lapadi_app_id;
        this.lapadi_app_token = config.lapadi_app_token;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations`;
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            return yield fetch(API_ENDPOINT, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    show(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/${slug}`;
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                }
            };
            return yield fetch(API_ENDPOINT, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
}
exports.IntegrationService = IntegrationService;
