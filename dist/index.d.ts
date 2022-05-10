import { LapadiConfiguration, LapadiRequestConfig } from "./helpers/constants";
import { AppService } from "./app";
import { IntegrationService } from "./IntegrationService";
declare class Lapadi {
    PACKAGE_VERSION: string;
    private USER_AGENT;
    VERSION: string;
    lapadi_api_url: LapadiConfiguration["api"]["url"];
    lapadi_api_version: LapadiConfiguration["api"]["version"];
    lapadi_app_token: LapadiConfiguration["app"]["token"];
    lapadi_app_id: LapadiConfiguration["app"]["id"];
    lapadi_api_endpoint: string;
    app: AppService;
    config: LapadiRequestConfig;
    integration: IntegrationService;
    constructor(config: LapadiConfiguration);
}
export { Lapadi };
