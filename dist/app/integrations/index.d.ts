import { LapadiRequestConfig } from "../../helpers/constants";
import { InstagramIntegration } from "./InstagramService";
declare class IntegrationService {
    instagram: InstagramIntegration;
    constructor(config: LapadiRequestConfig);
}
export { IntegrationService };
