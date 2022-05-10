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
exports.ShopService = void 0;
const qs_1 = __importDefault(require("qs"));
const modules_1 = require("../modules");
const localstorage_1 = require("../utils/localstorage");
class ShopService {
    constructor(config) {
        this.cartId = 'lapadi_app_shop_cart';
        this.lapadi_user_token = '';
        this.cartId = this.cartId;
        this.cache = new modules_1.CacheModule({ ttlSec: 6000, maxLength: 10000 });
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this.count = 0;
        this.total = 0;
        this.items = this.getCart();
        this.localCart = this.cache.get(this.cartId);
        this.session_data;
    }
    checkCart() {
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items;
        });
    }
    setItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            this.items = items;
            for (let i = 0; i < this.items.length; i++) {
                let _item = this.items[i];
                this.total += _item.total;
            }
        });
    }
    clearItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.items = [];
            this.total = 0;
            this.clearCart();
        });
    }
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemData = {
                id: item.id,
                quantity: 1,
                price: item.price.value,
                total: item.price.value,
                data: item
            };
            console.log("[MODLE] add item: ", itemData);
            if (this.containsItem(itemData.id) === false) {
                this.items.push(itemData);
                this.saveCart(this.items);
            }
            else {
                this.updateItem(itemData);
            }
            this.total += itemData.price * itemData.quantity;
            this.count += itemData.quantity;
        });
    }
    incresItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[MODLE] incresItem: ", item);
            if (this.containsItem(item.id) === false) {
                this.items.push(item);
                this.saveCart(this.items);
            }
            else {
                this.updateItem(item);
            }
        });
    }
    decreaseItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[MODLE] decreaseItem: ", item);
            for (let i = 0; i < this.items.length; i++) {
                let _item = this.items[i];
                if (item.id === _item.id) {
                    _item.quantity = parseInt(_item.quantity) - 1;
                    console.log("quantitiy: ", parseInt(_item.quantity) - 1);
                    _item.total = parseInt(_item.total) - parseInt(item.price);
                    this.items[i] = _item;
                    this.saveCart(this.items);
                }
            }
        });
    }
    containsItem(id) {
        if (this.items === undefined)
            return false;
        for (let i = 0; i < this.items.length; i++) {
            let _item = this.items[i];
            if (id == _item.id)
                return true;
        }
        return false;
    }
    updateItem(object) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log("[MODLE] update item: ", object);
                for (let i = 0; i < this.items.length; i++) {
                    let _item = this.items[i];
                    if (object.id === _item.id) {
                        _item.quantity = parseInt(_item.quantity) + 1;
                        _item.total = parseInt(_item.total) + parseInt(object.price);
                        this.items[i] = _item;
                        return this.saveCart(this.items).then((res) => resolve(res)).catch((err) => reject(err));
                    }
                }
            });
        });
    }
    saveCart(objects) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, localstorage_1.save)(objects, this.cartId)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }));
        });
    }
    getCart() {
        let cartItems = [];
        const checkData = (0, localstorage_1.list)(this.cartId);
        console.log("[MODLE] get cart: ", checkData);
        if (typeof checkData !== "undefined") {
            cartItems = checkData;
        }
        return cartItems;
    }
    clearCart() {
        (0, localstorage_1.clear)(this.cartId);
    }
    session(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/shop/checkout/session`;
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                },
                body: qs_1.default.stringify(data)
            };
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                return yield fetch(API_ENDPOINT, parameters)
                    .then(res => res.json())
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            }));
        });
    }
    checkout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/shop/checkout`;
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token,
                    'token': ''
                },
                body: qs_1.default.stringify(data)
            };
            return yield fetch(API_ENDPOINT, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
}
exports.ShopService = ShopService;
