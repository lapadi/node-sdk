
import { LapadiRequestConfig } from "../helpers/constants";
import { AppService } from "."

interface FromMail {
    name: string
    surname: string
    email: string
    phone: string
}
interface ToMail {
    name: string
    surname: string
    email: string
    phone: string
}

interface AppMail {
    id: string
}
interface CreateMailData {
    subject: string,
    text: string,
    from: FromMail
    to: ToMail
    app: AppMail
}

export class MailService extends AppService {

    constructor(config: LapadiRequestConfig){
        super(config)
    }

    async create(data: CreateMailData){
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/apps/${data.app.id || this.lapadi_app_id}/mail`;
        const parameters: RequestInit = {
            method: 'POST',
            headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.lapadi_app_token
            },
            body: JSON.stringify(data)
        };

        return await fetch(API_ENDPOINT, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }
}