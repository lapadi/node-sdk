import { LapadiConfig } from '../lapadi';
import { LoginData, RegisterData, AppUserRegisterResponse } from '../types';
export declare class Auth {
    /**
     * Config  of autth
     */
    _config: LapadiConfig;
    private _token;
    /**
     * Creates an instance of auth.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    /**
     * Logins auth
     * @param data
     * @returns login
     */
    get token(): string;
    set token(token: string);
    login(data: LoginData): Promise<any | any>;
    /**
     * Registers auth
     * @param data
     * @returns
     */
    register(data: RegisterData): Promise<AppUserRegisterResponse | any>;
    /**
     * auth me
     * @returns
    */
    me(token?: string): Promise<unknown>;
    update(data: any): void;
    recovery(email: string): Promise<unknown>;
}
//# sourceMappingURL=Auth.d.ts.map