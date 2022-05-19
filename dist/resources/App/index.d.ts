import { LapadiConfig } from '../../lapadi';
import { Contact } from './Contact';
import { Auth } from './Auth';
import { Content } from './Content';
import { Shop } from './Shop';
export declare class App {
    /**
     * Config  of app
     */
    _config: LapadiConfig;
    /**
     * Contact  of app
     */
    contact: Contact;
    auth: Auth;
    content: Content;
    shop: Shop;
    protocol?: string;
    host?: string;
    api_version: string;
    /**
     * Creates an instance of app.
     * @param config
     */
    constructor(config: LapadiConfig);
    /**
     * Gets app
     * @returns
     */
    get(): Promise<unknown>;
}
//# sourceMappingURL=index.d.ts.map