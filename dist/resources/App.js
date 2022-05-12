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
    }
    /**
     * Gets app
     * @returns
     */
    get() {
        console.log('api_endpoint: ', this._config.api_endpoint);
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
}
exports.App = App;
