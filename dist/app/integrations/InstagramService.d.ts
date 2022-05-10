import { LapadiRequestConfig } from "../../helpers/constants";
declare class InstagramIntegration {
    lapadi_app_token: string;
    lapadi_api_endpoint: string;
    constructor(config: LapadiRequestConfig);
    feeds(): Promise<any>;
}
export { InstagramIntegration };
