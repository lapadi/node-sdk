import { OrderService } from "./OrderService";
import { LapadiRequestConfig } from "../helpers/constants";
interface RegisterRequest {
    name: string;
    surname: string;
    full_name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
}
interface UpdatePasswordRequest {
    email: string;
    password: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
interface RecoveryPasswordRequest {
    email: string;
}
interface ConfirmAccountRequest {
    code: string;
    email: string;
}
interface LoginResponse {
    email: string;
    password: string;
}
declare class AuthService {
    order: OrderService;
    token: string | undefined;
    lapadi_api_endpoint: string;
    lapadi_app_token: string;
    constructor(config: LapadiRequestConfig);
    me(): Promise<any | any>;
    login(data: LoginResponse): Promise<any | any>;
    register(data: RegisterRequest): Promise<any | any>;
    updatePassword(data: UpdatePasswordRequest): Promise<any>;
    recovery(data: RecoveryPasswordRequest): Promise<any>;
    confirm(data: ConfirmAccountRequest): Promise<any>;
    logout(): Promise<unknown>;
    update(id: string, data: any): Promise<any>;
    _token(): string | undefined;
}
export { AuthService };
