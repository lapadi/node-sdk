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
exports.fetcher = void 0;
const fetcher = (method = 'GET', API_ENDPOINT, { token, lapadi_app_token, body }) => __awaiter(void 0, void 0, void 0, function* () {
    let parameters = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': lapadi_app_token,
        }
    };
    if (token) {
        parameters.headers['token'] = token;
    }
    if (body) {
        parameters['body'] = JSON.stringify(body);
    }
    return yield fetch(API_ENDPOINT, parameters)
        .then(res => res.json())
        .then(res => res)
        .catch(error => error);
});
exports.fetcher = fetcher;
