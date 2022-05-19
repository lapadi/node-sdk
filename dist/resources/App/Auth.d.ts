import { LapadiConfig } from '../../lapadi';
import { AppLoginData } from '../../types';
/**
 * Auth
 */
export declare class Auth {
    /**
     * Config  of autth
     */
    _config: LapadiConfig;
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
}
//# sourceMappingURL=Auth.d.ts.map