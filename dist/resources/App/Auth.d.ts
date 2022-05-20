import { LapadiConfig } from '../../lapadi';
import { AppLoginData, AppRegisterData } from '../../types';
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
     * Registers auth register
     * @param data register
     * @returns register
     */
    register(data: AppRegisterData): Promise<unknown>;
    /**
     * auth me
     * @returns
     */
    me(): Promise<unknown>;
    update(data: any): void;
    session(): void;
}
//# sourceMappingURL=Auth.d.ts.map