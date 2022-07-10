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
exports.App = void 0;
const Contact_1 = require("./Contact");
const Auth_1 = require("./Auth");
const Content_1 = require("./Content");
const Shop_1 = require("./Shop");
const Gateway_1 = require("./Gateway");
const Comment_1 = require("./Comment");
class App {
    /**
     * Creates an instance of app.
     * @param config
     */
    constructor(config) {
        this._config = config;
        this.protocol = config.api.protocol || 'https://';
        this.host = config.api.host || "api.lapadi.com";
        this.api_version = config.api.version || 'v1';
        this._config.api_endpoint = `${this.protocol}${this.host}/api/${this.api_version}`;
        this.contact = new Contact_1.Contact(this._config);
        this.auth = new Auth_1.Auth(this._config);
        this.content = new Content_1.Content(this._config);
        this.shop = new Shop_1.Shop(this._config);
        this.gateway = new Gateway_1.Gateway(this._config);
        this.comment = new Comment_1.Comment(this._config);
    }
    /**
     * Gets app
     * @returns
     */
    get() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //   'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                }
            };
            yield fetch(`${this._config.api_endpoint}/apps/${this._config.app.id}`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    list() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //   'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                }
            };
            yield fetch(`${this._config.api_endpoint}/apps`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    allApps() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //   'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            yield fetch(`${this._config.api_endpoint}/apps/list`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
}
exports.App = App;
