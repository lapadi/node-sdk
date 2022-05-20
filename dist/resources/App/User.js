"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.User = void 0;
class User {
    constructor(_config) {
        this._config = _config;
        this.address = new Address(_config);
    }
}
exports.User = User;
class Address {
    constructor(_config) {
        this._config = _config;
    }
    list(filter) {
    }
    show(id) {
    }
    update(id, data) {
    }
    delete(id) {
    }
}
exports.Address = Address;
