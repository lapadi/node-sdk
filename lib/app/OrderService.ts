import { LapadiRequestAuthConfig, LapadiRequestConfig } from "../helpers/constants";

interface CreateOrderRequest {

}

interface CreateOrderResponse {

}

interface CreateOrderErrors {
    errors: [Error]
}

interface UpdateOrderRequest {
    statusId: string
}


class OrderService {

    lapadi_api_url = '';
    lapadi_api_version = '';
    lapadi_app_token: string;
    lapadi_app_id = '';
    lapadi_api_endpoint: string
    lapadi_user_token: string;
    
    constructor(config: LapadiRequestAuthConfig) {
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this.lapadi_user_token = config.lapadi_user_token;
    }

    public async list(){
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token,
                'token': this.lapadi_user_token
            },
        }
        return await fetch(`${this.lapadi_api_endpoint}/orders`, parameters)
        .then(res => res.json())
        .then(res => res)
        .catch(error => error);
    }

    public async show(){}
 
    public async create(data: CreateOrderRequest): Promise<CreateOrderResponse | CreateOrderErrors> {
        const parameters: RequestInit = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token,
                'token': this.lapadi_user_token
            },
            body: JSON.stringify(data),
        };
        return await fetch(`${this.lapadi_api_endpoint}/orders`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

    public async update(id: string, data: UpdateOrderRequest){
        const parameters: RequestInit = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token,
                'token': this.lapadi_user_token
            },
            body: JSON.stringify(data),
        };
        return await fetch(`${this.lapadi_api_endpoint}/orders/${id}`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

    public async delete(id: string){
        const parameters: RequestInit = {
            method: 'DELETE',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token,
                'token': this.lapadi_user_token
            }
        };
        return await fetch(`${this.lapadi_api_endpoint}/orders/${id}`, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    };

};

export {
    OrderService
};