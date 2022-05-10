import { LapadiRequestAuthConfig } from "../helpers/constants";
interface CreateOrderRequest {
}
interface CreateOrderResponse {
}
interface CreateOrderErrors {
    errors: [Error];
}
interface UpdateOrderRequest {
    statusId: string;
}
declare class OrderService {
    lapadi_api_url: string;
    lapadi_api_version: string;
    lapadi_app_token: string;
    lapadi_app_id: string;
    lapadi_api_endpoint: string;
    lapadi_user_token: string;
    constructor(config: LapadiRequestAuthConfig);
    list(): Promise<any>;
    show(): Promise<void>;
    create(data: CreateOrderRequest): Promise<CreateOrderResponse | CreateOrderErrors>;
    update(id: string, data: UpdateOrderRequest): Promise<any>;
    delete(id: string): Promise<any>;
}
export { OrderService };
