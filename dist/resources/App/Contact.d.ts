import { LapadiConfig } from '../../lapadi';
import { MailSendData } from '../../types';
/**
 * Contact
 */
export declare class Contact {
    /**
     * Config  of contact
     */
    _config: LapadiConfig;
    comment: Comment;
    price: Price;
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
declare class Comment {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    create(): void;
    update(id: string, data: any): void;
    list(filter: any): void;
    delete(id: string): void;
}
declare class Price {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    show(id: string): void;
    list(filter: any): void;
}
export {};
//# sourceMappingURL=Contact.d.ts.map