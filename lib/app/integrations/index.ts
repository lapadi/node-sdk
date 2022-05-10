import { LapadiRequestConfig } from "../../helpers/constants";
import { InstagramIntegration } from "./InstagramService";



class IntegrationService {

    instagram: InstagramIntegration


    constructor(config: LapadiRequestConfig){
        this.instagram = new InstagramIntegration(config);
    }
}

export { IntegrationService }