import { LapadiRequestConfig } from "../helpers/constants";
import { AppService } from "."


class ContactService extends AppService {

    constructor(config: LapadiRequestConfig){
        super(config)
    }

}

export { ContactService }