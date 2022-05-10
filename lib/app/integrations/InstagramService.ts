import { LapadiRequestConfig } from "../../helpers/constants";


class InstagramIntegration {

    lapadi_app_token: string;
    lapadi_api_endpoint: string
    
    constructor(config: LapadiRequestConfig) {
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token
        
    };

    public async feeds(){
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(`${this.lapadi_api_endpoint}/integrations/instagram/feeds`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

}

export { InstagramIntegration }