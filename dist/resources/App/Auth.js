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
class Auth {
    /**
     * Creates an instance of auth.
     * @param _config
     */
    constructor(_config) {
        this._config = _config;
        this.address = new User_1.Address(this._config);
    }
    /**
     * Logins auth
     * @param data
     * @returns login
     */
    login(data) {
        console.log('AppLoginData _Config: ', this._config);
        console.log("AppLoginData: ", data);
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
            yield fetch(`${this._config.api_endpoint}/auth/login`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    /**
     * Registers auth
     * @param data
     * @returns
     */
    register(data) {
        console.log('AppRegisterData _Config: ', this._config);
        console.log("AppRegisterData: ", data);
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
    me() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token,
                    'Authorization': 'Bearer ' + this.token,
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
    session() {
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
