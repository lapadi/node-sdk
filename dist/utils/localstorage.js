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
exports.clear = exports.save = exports.list = exports.listen = void 0;
const STORAGE_KEY = '__cart';
let saveListener = null;
const listen = (cb) => { saveListener = cb; }; // ugly but storage listener is not working for the same window..
exports.listen = listen;
const list = (key) => {
    let userData = [];
    try {
        // Parse a JSON
        userData = JSON.parse(window.localStorage.getItem(key || STORAGE_KEY)) || [];
    }
    catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the payload
        // So just return that
        userData = [];
    }
    console.log("[MODULE=CHACHE] list key: ", key, userData);
    return userData;
};
exports.list = list;
// export const products = () => JSON.parse(JSON.stringify(data)) || [];
// export const user = () => JSON.parse(JSON.stringify(userData)) || {};
const save = (data, key) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[MODULE=CHACHE] save key: ", key, data);
    let saved;
    try {
        // Parse a JSON
        saved = window.localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
    }
    catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the payload
        // So just return that
        return e;
    }
    // if(saveListener) saveListener(list(key || STORAGE_KEY))
    return saved;
});
exports.save = save;
const clear = (key) => {
    typeof window.localStorage.removeItem(key || STORAGE_KEY);
    if (saveListener)
        saveListener((0, exports.list)(key || STORAGE_KEY));
};
exports.clear = clear;
