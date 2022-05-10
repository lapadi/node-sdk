import { LapadiRequestConfig } from "../helpers/constants";
import { IntegrationService } from "../IntegrationService";
import { CacheModule } from "../modules";
import { AuthService } from "./AuthService";
import { ContactService } from "./ContactService";
import { ContentService } from "./ContentService";
import { ShopService } from "./ShopService";
import { MailService } from "./MailService";
declare class AppService {
    cache: CacheModule;
    auth: AuthService;
    content: ContentService;
    contact: ContactService;
    integration: IntegrationService;
    lapadi_api_endpoint: string;
    lapadi_app_token: string;
    lapadi_app_id: string;
    shop: ShopService;
    mail: MailService;
    constructor(config: LapadiRequestConfig);
    detail(): Promise<any>;
    paymentMethods(): Promise<any>;
    shippingMethods(): Promise<any>;
    show(): Promise<any>;
}
export { AppService };
