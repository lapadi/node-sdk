"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lapadi = void 0;
const resources_1 = require("./resources");
class Lapadi {
    constructor(options) {
        this._config = options;
        this.app = new resources_1.App(this._config);
    }
}
exports.Lapadi = Lapadi;
