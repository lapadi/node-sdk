import { LapadiRequestConfig } from "./helpers/constants";
declare class IntegrationService {
    lapadi_api_endpoint: string;
    lapadi_app_id: string;
    lapadi_app_token: string;
    constructor(config: LapadiRequestConfig);
    list(): Promise<any | any>;
    show(slug: string): Promise<any | any>;
}
export { IntegrationService };
