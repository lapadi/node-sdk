import { LapadiConfig } from '../lapadi';
import { Contact } from './Contact';
export declare class App {
    /**
     * Config  of app
     */
    _config: LapadiConfig;
    /**
     * Contact  of app
     */
    contact: Contact;
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
//# sourceMappingURL=App.d.ts.map