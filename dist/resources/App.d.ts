import { LapadiConfig } from '../lapadi';
import { Contact } from './Contact';
export declare class App {
    _config: LapadiConfig;
    contact: Contact;
    protocol?: string;
    host?: string;
    api_version: string;
    constructor(config: LapadiConfig);
    /**
     * Gets app
     * @returns
     */
    get(): Promise<unknown>;
}
//# sourceMappingURL=App.d.ts.map