import { LapadiRequestConfig } from "../helpers/constants";
import { AppService } from ".";
interface FromMail {
    name: string;
    surname: string;
    email: string;
    phone: string;
}
interface ToMail {
    name: string;
    surname: string;
    email: string;
    phone: string;
}
interface AppMail {
    id: string;
}
interface CreateMailData {
    subject: string;
    text: string;
    from: FromMail;
    to: ToMail;
    app: AppMail;
}
export declare class MailService extends AppService {
    constructor(config: LapadiRequestConfig);
    create(data: CreateMailData): Promise<any>;
}
export {};
