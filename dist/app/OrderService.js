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
exports.OrderService = void 0;
class OrderService {
    constructor(config) {
        this.lapadi_api_url = '';
        this.lapadi_api_version = '';
        this.lapadi_app_id = '';
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this.lapadi_user_token = config.lapadi_user_token;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                    'token': this.lapadi_user_token
                },
            };
            return yield fetch(`${this.lapadi_api_endpoint}/orders`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                    'token': this.lapadi_user_token
                },
                body: JSON.stringify(data),
            };
            return yield fetch(`${this.lapadi_api_endpoint}/orders`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                    'token': this.lapadi_user_token
                },
                body: JSON.stringify(data),
            };
            return yield fetch(`${this.lapadi_api_endpoint}/orders/${id}`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                    'token': this.lapadi_user_token
                }
            };
            return yield fetch(`${this.lapadi_api_endpoint}/orders/${id}`, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    ;
}
exports.OrderService = OrderService;
;
