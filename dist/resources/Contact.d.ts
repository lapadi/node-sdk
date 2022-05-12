import { LapadiConfig } from '../lapadi';
import { MailSendData } from '../types';
/**
 * Contact
 */
export declare class Contact {
    _config: LapadiConfig;
    /**
    * Creates an instance of documenter.
    */
    constructor(_config: LapadiConfig);
    /**
     * // TODO: comment getScriptVersion
     * Gets script version
     * @param data
     * @returns script version
    */
    send(data: MailSendData): Promise<unknown>;
}
//# sourceMappingURL=Contact.d.ts.map