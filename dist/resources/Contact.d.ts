import { LapadiConfig } from '../lapadi';
import { MailSendData } from '../types';
/**
 * Contact
 */
export declare class Contact {
    /**
     * Config  of contact
     */
    _config: LapadiConfig;
    /**
     * Creates an instance of contact.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    /**
     * Sends mail of on App
     * @param data
     * @returns send
     */
    send(data: MailSendData): Promise<any | any>;
}
//# sourceMappingURL=Contact.d.ts.map