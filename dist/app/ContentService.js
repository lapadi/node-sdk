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
exports.ContentService = void 0;
const querystring = require('querystring');
const modules_1 = require("../modules");
const CONTENT_TYPES = ['category', 'product', 'article', 'news'];
const CONTENT_STATUS = ['active', 'pasive', 'deleted'];
class ContentService {
    constructor(config) {
        this.cache = new modules_1.CacheModule({ ttlSec: 600, maxLength: 10000 });
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
    }
    ;
    req(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const API_ENDPOINT = `${this.lapadi_api_endpoint}/contents?${this.trimFilter(filter)}`;
                console.log("API_ENDPOINT: ", API_ENDPOINT);
                const parameters = {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'application/json'
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-access-token': this.lapadi_app_token
                    }
                };
                fetch(API_ENDPOINT, parameters)
                    .then(res => res.json())
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            });
        });
    }
    list(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            const request = (() => __awaiter(this, void 0, void 0, function* () { return yield this.req(filter); }))();
            return request;
            //
            let cachedData;
            const checkData = this.cache.get(`app:${this.lapadi_app_token}:content:list`);
            if (typeof checkData !== "undefined") {
                cachedData = checkData;
            }
            else {
                const request = (() => __awaiter(this, void 0, void 0, function* () { return yield this.req(filter); }))();
                yield this.cache.get(`app:${this.lapadi_app_token}:content:list`, () => __awaiter(this, void 0, void 0, function* () {
                    return yield request;
                }), 30);
                cachedData = request;
            }
            return cachedData;
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_ENDPOINT = `${this.lapadi_api_endpoint}/contents/${id}`;
            const parameters = {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.lapadi_app_token
                }
            };
            return yield fetch(API_ENDPOINT, parameters)
                .then(res => res.json())
                .then(res => res)
                .catch(error => error);
        });
    }
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    trimFilter(data) {
        var isObj = function (a) {
            if ((!!a) && (a.constructor === Object)) {
                return true;
            }
            return false;
        };
        var _st = function (z, g) {
            return "" + (g != "" ? "[" : "") + z + (g != "" ? "]" : "");
        };
        var fromObject = function (params, skipobjects, prefix) {
            if (skipobjects === void 0) {
                skipobjects = false;
            }
            if (prefix === void 0) {
                prefix = "";
            }
            var result = "";
            if (typeof (params) != "object") {
                return prefix + "=" + encodeURIComponent(params) + "&";
            }
            for (var param in params) {
                var c = "" + prefix + _st(param, prefix);
                if (isObj(params[param]) && !skipobjects) {
                    result += fromObject(params[param], false, "" + c);
                }
                else if (Array.isArray(params[param]) && !skipobjects) {
                    params[param].forEach(function (item, ind) {
                        result += fromObject(item, false, c + "[" + ind + "]");
                    });
                }
                else {
                    result += c + "=" + encodeURIComponent(params[param]) + "&";
                }
            }
            return result;
        };
        return fromObject(data, null, 'filter');
    }
}
exports.ContentService = ContentService;
