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
exports.Comment = void 0;
const qs = require("qs");
/**
 * Content
 */
class Comment {
    /**
     * Creates an instance of auth.
     * @param _config
     */
    constructor(_config) {
        this._config = _config;
    }
    /**
     * Comments content
     * @param filter
     * @returns
     */
    comments(filter) {
        let str = qs.stringify({ filter });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                }
            };
            yield fetch(`${this._config.api_endpoint}/comments?${str}`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
    addComment(body) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const parameters = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this._config.app.token
                },
                body: qs.stringify(body)
            };
            yield fetch(`${this._config.api_endpoint}/comments`, parameters)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(error => reject(error));
        }));
    }
}
exports.Comment = Comment;
