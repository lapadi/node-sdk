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
exports.AppService = void 0;
const IntegrationService_1 = require("../IntegrationService");
const modules_1 = require("../modules");
const AuthService_1 = require("./AuthService");
const ContactService_1 = require("./ContactService");
const ContentService_1 = require("./ContentService");
const ShopService_1 = require("./ShopService");
const MailService_1 = require("./MailService");
class AppService {
    constructor(config) {
        this.cache = new modules_1.CacheModule({ ttlSec: 600, maxLength: 10000 });
        this.auth = new AuthService_1.AuthService(config);
        this.content = new ContentService_1.ContentService(config);
        this.contact = new ContactService_1.ContactService(config);
        this.mail = new MailService_1.MailService(config);
        this.integration = new IntegrationService_1.IntegrationService(config);
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this.lapadi_app_id = config.lapadi_app_id;
        this.shop = new ShopService_1.ShopService(config);
    }
    ;
    detail() {
        return __awaiter(this, void 0, void 0, function* () {
            let cachedData;
            const checkData = this.cache.get(`app:${this.lapadi_app_token}:detail`);
            if (typeof checkData !== "undefined") {
                cachedData = checkData;
            }
            else {
                const request = (() => __awaiter(this, void 0, void 0, function* () { return yield this.show(); }))();
                yield this.cache.get(`app:${this.lapadi_app_token}:detail`, () => __awaiter(this, void 0, void 0, function* () {
                    return yield request;
                }), 30);
                cachedData = request;
            }
            return cachedData;
        });
    }
    paymentMethods() {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                }
            };
            return yield fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}/gateway/payment`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    shippingMethods() {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                }
            };
            return yield fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}/gateway/shipping`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                }
            };
            return yield fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
}
exports.AppService = AppService;
