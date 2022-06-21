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
exports.Shop = void 0;
const qs = require("qs");
const Auth_1 = require("./Auth");
/**
 * Shop
 */
class Shop {
    /**
     * Creates an instance of shop.
     * @param _config
     */
    constructor(_config) {
        this._config = _config;
        this.cart = new Cart(this._config);
    }
    session(body) {
        console.log('session shop _Config: ', this._config);
        // let par = new URLSearchParams(filter).toString();
        const auth = new Auth_1.Auth(this._config);
        console.log('session shop auth.token: ', auth.token);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token,
                    'token': auth.token
                },
                body: qs.stringify(body)
            };
            yield fetch(`${this._config.api_endpoint}/integrations/shop/checkout/session`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
}
exports.Shop = Shop;
class Cart {
    constructor(_config) {
        this._config = _config;
        this._items = [];
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
    }
    add() { }
    update() { }
    remove() { }
}
