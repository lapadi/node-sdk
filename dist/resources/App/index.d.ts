import { LapadiConfig } from '../../lapadi';
import { AppsResponse } from '../../types';
import { Contact } from './Contact';
import { Auth } from './Auth';
import { Content } from './Content';
import { Shop } from './Shop';
import { Gateway } from './Gateway';
import { Comment } from './Comment';
export declare class App {
    /**
     * Config  of app
     */
    _config: LapadiConfig;
    protocol?: string;
    host?: string;
    api_version: string;
    /**
     * Contact  of app
     */
    contact: Contact;
    auth: Auth;
    content: Content;
    shop: Shop;
    gateway: Gateway;
    comment: Comment;
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
    list(): Promise<unknown>;
    allApps(): Promise<AppsResponse | undefined>;
}
//# sourceMappingURL=index.d.ts.map