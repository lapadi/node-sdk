import { LapadiConfig } from '../../lapadi';
import { AppLoginData, AppRegisterData, AppUserRegisterResponse } from '../../types';
import { Address } from './User';
/**
 * Auth
 */
export declare class Auth {
    /**
     * Config  of autth
     */
    _config: LapadiConfig;
    token: string | undefined;
    address: Address;
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
    login(data: AppLoginData): Promise<any | any>;
    /**
     * Registers auth
     * @param data
     * @returns
     */
    register(data: AppRegisterData): Promise<AppUserRegisterResponse | any>;
    /**
     * auth me
     * @returns
    */
    me(): Promise<unknown>;
    update(data: any): void;
    session(): void;
    recovery(email: string): Promise<unknown>;
}
//# sourceMappingURL=Auth.d.ts.map