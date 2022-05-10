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
exports.MailService = void 0;
const _1 = require(".");
class MailService extends _1.AppService {
    constructor(config) {
        super(config);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/apps/${data.app.id || this.lapadi_app_id}/mail`;
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                },
                body: JSON.stringify(data)
            };
            return yield fetch(API_ENDPOINT, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
}
exports.MailService = MailService;
