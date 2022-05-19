"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
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
        this.items = [];
        this.cart = new Cart(this._config);
    }
    session() { }
}
exports.Shop = Shop;
class Cart {
    constructor(_config) {
        this._config = _config;
    }
    add() { }
    update() { }
    remove() { }
}
