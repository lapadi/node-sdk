"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lapadi = void 0;
const pjson = require('../package.json');
const app_1 = require("./app");
const IntegrationService_1 = require("./IntegrationService");
const APP_INFO_PROPERTIES = ['id', 'slug', 'token'];
class Lapadi {
    constructor(config) {
        this.PACKAGE_VERSION = pjson.version;
        this.VERSION = this.PACKAGE_VERSION;
        this.USER_AGENT = {
            bindings_version: this.PACKAGE_VERSION,
            lang: 'node',
            lang_version: process.version,
            platform: process.platform,
            publisher: 'stripe',
            uname: null,
            typescript: false,
        },
            this.lapadi_api_url = config.api.url;
        this.lapadi_api_version = config.api.version = 'v1';
        this.lapadi_app_token = config.app.token;
        this.lapadi_app_id = config.app.id;
        this.lapadi_api_endpoint = `${this.lapadi_api_url}/api/${this.lapadi_api_version}`;
        this.config = {
            lapadi_api_url: this.lapadi_api_url,
            lapadi_api_version: this.lapadi_api_version,
            lapadi_app_token: this.lapadi_app_token,
            lapadi_app_id: this.lapadi_app_id,
            lapadi_api_endpoint: this.lapadi_api_endpoint
        },
            this.app = new app_1.AppService(this.config);
        this.integration = new IntegrationService_1.IntegrationService(this.config);
    }
}
exports.Lapadi = Lapadi;
