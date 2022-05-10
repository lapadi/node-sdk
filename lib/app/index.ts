import { Lapadi } from "..";
import { LapadiRequestConfig } from "../helpers/constants";
import { IntegrationService } from "../IntegrationService";
import { CacheModule } from "../modules";
import { AuthService } from "./AuthService";
import { ContactService } from "./ContactService";
import { ContentService } from "./ContentService"
import { ShopService } from "./ShopService";
import { MailService } from "./MailService";

class AppService {

    cache: CacheModule
    auth: AuthService;
    content: ContentService;
    contact: ContactService;
    integration: IntegrationService;
    lapadi_api_endpoint: string;
    lapadi_app_token: string
    lapadi_app_id: string
    shop: ShopService;
    mail: MailService;

    constructor(config: LapadiRequestConfig){
        this.cache = new CacheModule({ ttlSec: 600, maxLength: 10000 })
        this.auth = new AuthService(config)
        this.content = new ContentService(config);
        this.contact = new ContactService(config);
        this.mail = new MailService(config);
        this.integration = new IntegrationService(config)
        this.lapadi_api_endpoint = config.lapadi_api_endpoint
        this.lapadi_app_token = config.lapadi_app_token
        this.lapadi_app_id = config.lapadi_app_id;
        this.shop = new ShopService(config)
    };

    public async detail(): Promise<any> {
        let cachedData;
        const checkData = this.cache.get(`app:${this.lapadi_app_token}:detail`);
        if (typeof checkData !== "undefined") {
            cachedData = checkData;
        } else {
            const request = (async () => await this.show())()
            await this.cache.get(
                `app:${this.lapadi_app_token}:detail`,
                async () => {
                  return await request;
                }, 
                30
            );
            cachedData = request
        }
        return cachedData


    }

    public async paymentMethods(){
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
            // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}/gateway/payment`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

    public async shippingMethods(){
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
            // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}/gateway/shipping`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

    async show(){
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
            // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(`${this.lapadi_api_endpoint}/apps/${this.lapadi_app_id}`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }
}

export {
    AppService
}
