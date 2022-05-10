import { LapadiRequestConfig } from "./helpers/constants";

class IntegrationService {

    lapadi_api_endpoint: string
    lapadi_app_id: string
    lapadi_app_token: string;

    
    constructor(config: LapadiRequestConfig){
        this.lapadi_api_endpoint = config.lapadi_api_endpoint
        this.lapadi_app_id = config.lapadi_app_id
        this.lapadi_app_token = config.lapadi_app_token
    }

    public async list(): Promise<any | any> {
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations`;
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return await fetch(API_ENDPOINT, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }


    public async show(slug: string): Promise<any | any> {

        const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/${slug}`;
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(API_ENDPOINT, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }
}

export {
    IntegrationService
}