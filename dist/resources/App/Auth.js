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
exports.Auth = void 0;
const qs = require("qs");
const User_1 = require("./User");
/**
 * Auth
 */
let token;
if (typeof window !== 'undefined') {
    const data = localStorage.getItem('_token');
    if (data !== null) {
        token = JSON.parse(data);
    }
}
class Auth {
    /**
     * Creates an instance of auth.
     * @param _config
     */
    constructor(_config) {
        this._token = token;
        this._config = _config;
        this.address = new User_1.Address(this._config);
    }
    /**
     * Logins auth
     * @param data
     * @returns login
     */
    get token() {
        return this._token;
    }
    set token(token) {
        this._token = token;
    }
    login(body) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                },
                body: qs.stringify(body)
            };
            yield fetch(`${this._config.api_endpoint}/auth/login`, parameters)
                .then(res => res.json())
                .then((res) => {
                const { data } = res;
                data && data.token && localStorage.setItem('_token', JSON.stringify(data.token));
                return resolve(res);
            })
                .catch(error => reject(error));
        }));
    }
    /**
     * Registers auth
     * @param data
     * @returns
     */
    register(data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                },
                body: qs.stringify(data)
            };
            yield fetch(`${this._config.api_endpoint}/auth/register`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    /**
     * auth me
     * @returns
    */
    me(token) {
        const _token = token || this.token;
        console.log("tokenenennene: ", _token);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token,
                    'token': _token,
                }
            };
            yield fetch(`${this._config.api_endpoint}/auth/me`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    update(data) {
    }
    recovery(email) {
        console.log('recovery _Config: ', this._config);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                },
                body: qs.stringify(email)
            };
            yield fetch(`${this._config.api_endpoint}/auth/recovery_password`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
}
exports.Auth = Auth;
