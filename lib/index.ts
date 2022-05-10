import { LapadiConfiguration, LapadiRequestConfig, USER_AGENT } from "./helpers/constants";
const pjson = require('../package.json')
import { AppService } from "./app";
import { IntegrationService } from "./IntegrationService";

const APP_INFO_PROPERTIES = ['id', 'slug', 'token'];

class Lapadi {

    PACKAGE_VERSION: string;
    private USER_AGENT: USER_AGENT;
    VERSION: string;
    lapadi_api_url: LapadiConfiguration["api"]["url"];
    lapadi_api_version: LapadiConfiguration["api"]["version"];
    lapadi_app_token: LapadiConfiguration["app"]["token"];
    lapadi_app_id: LapadiConfiguration["app"]["id"];
    lapadi_api_endpoint: string;
    app: AppService;
    config: LapadiRequestConfig
    integration: IntegrationService;

    constructor(config: LapadiConfiguration) {
        this.PACKAGE_VERSION = pjson.version;
        this.VERSION = this.PACKAGE_VERSION
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
            lapadi_api_endpoint:  this.lapadi_api_endpoint
        },
        this.app = new AppService(this.config);
        this.integration = new IntegrationService(this.config)
    }


}

export {Lapadi}