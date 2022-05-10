"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_IDS = exports.CURRENT_UNIX_TIME = void 0;
const CURRENT_UNIX_TIME = () => Math.round((new Date()).getTime() / 1000);
exports.CURRENT_UNIX_TIME = CURRENT_UNIX_TIME;
exports.SET_IDS = ['00', '01'];
