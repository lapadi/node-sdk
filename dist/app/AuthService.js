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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const OrderService_1 = require("./OrderService");
const fetch_1 = require("../utils/fetch");
class AuthService {
    constructor(config) {
        this.token = this._token();
        this.order = new OrderService_1.OrderService(Object.assign(Object.assign({}, config), { lapadi_user_token: this.token }));
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this._token();
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[MODULE]: token: ", this.token);
            if (!this.token)
                return;
            let response = {
                loading: true,
            };
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/me`;
            const res = yield (0, fetch_1.fetcher)('GET', API_ENDPOINT, {
                token: this.token,
                lapadi_app_token: this.lapadi_app_token
            });
            return Object.assign(Object.assign(Object.assign({}, response), res), { loading: false });
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[MODULE]: login values: ", data);
            if (!data)
                return;
            let response = {
                loading: true,
                errors: false,
                data: false,
            };
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/login`;
            const res = yield (0, fetch_1.fetcher)('POST', API_ENDPOINT, {
                lapadi_app_token: this.lapadi_app_token,
                body: data
            });
            if (res.data.token) {
                js_cookie_1.default.set('token', res.data.token, { expires: 14 });
                // save the userId from the login response in a cookie
                js_cookie_1.default.set('appUserId', res.data.user.id, { expires: 14 });
            }
            ;
            return Object.assign(Object.assign(Object.assign({}, response), res), { loading: false });
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return;
            let response = {
                loading: true,
                errors: false,
                data: false,
            };
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/register`;
            const res = yield (0, fetch_1.fetcher)('POST', API_ENDPOINT, {
                lapadi_app_token: this.lapadi_app_token,
                body: data
            });
            if (res.data.token) {
                js_cookie_1.default.set('token', res.data.token, { expires: 14 });
                // save the userId from the login response in a cookie
                js_cookie_1.default.set('appUserId', res.data.user.id, { expires: 14 });
            }
            ;
            return Object.assign(Object.assign(Object.assign({}, response), res), { loading: false });
        });
    }
    updatePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/update_password`;
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
    recovery(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/recovery_password`;
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
    confirm(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/account_confirmation`;
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
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                loading: true,
                errors: false,
            };
            try {
                js_cookie_1.default.remove('appUserId');
                js_cookie_1.default.remove('token');
                this.token = undefined;
                return true;
            }
            catch (error) {
                return error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[MODULE]: update values: ", id, data);
            let response = {
                loading: true,
                errors: false,
            };
            if (!data || !id || !this.token) {
                return Object.assign(Object.assign({}, response), { errors: [{
                            message: "Invalid token! or Data not provide!",
                        }] });
            }
            ;
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/users/${id}`;
            const res = yield (0, fetch_1.fetcher)('PATCH', API_ENDPOINT, {
                lapadi_app_token: this.lapadi_app_token,
                token: this.token,
                body: data
            });
            return Object.assign(Object.assign(Object.assign({}, response), res), { loading: false });
        });
    }
    // eslint-disable-next-line import/prefer-default-export
    _token() {
        let data;
        if (typeof window !== 'undefined') {
            data = js_cookie_1.default.get('token');
            console.log('You are on the browser');
            // 👉️ can use localStorage here
            this.token = data;
        }
        return data;
    }
    ;
}
exports.AuthService = AuthService;
