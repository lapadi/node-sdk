export const CURRENT_UNIX_TIME = (): number => Math.round((new Date()).getTime() / 1000);
export const SET_IDS: string[] = ['00', '01'];

interface ApiConfiguration {
    url: string;
    version: string;
    type?: 'development' | 'production' | 'test';
}
interface AppConfiguration {
    id: string;
    token: string;
    slug?: string;
}

export interface LapadiConfiguration {
    api: ApiConfiguration;
    app: AppConfiguration;
}

export interface USER_AGENT {
    bindings_version: string,
    lang: string,
    lang_version: string,
    platform: string
    publisher: string,
    uname: any,
    typescript: boolean,
}

export interface LapadiRequestConfig {
    lapadi_api_url: LapadiConfiguration["api"]["url"];
    lapadi_api_version: LapadiConfiguration["api"]["version"];
    lapadi_api_endpoint: string;
    lapadi_app_id: LapadiConfiguration["app"]["id"];
    lapadi_app_token: LapadiConfiguration["app"]["token"];
}

export interface LapadiRequestAuthConfig {
    lapadi_api_url: LapadiConfiguration["api"]["url"];
    lapadi_api_version: LapadiConfiguration["api"]["version"];
    lapadi_api_endpoint: string;
    lapadi_app_id: LapadiConfiguration["app"]["id"];
    lapadi_app_token: LapadiConfiguration["app"]["token"];
    lapadi_user_token: string
}


export interface ItemInterface {
    id: any,
    name: any,
    price: any,
    count: any,
    total: any,
}

export interface _ItemInterface {
    id: any,
    name: any,
    price: any,
    count: any,
    total: any,
    quantity: any
}

export interface Error {
    name?: string;
    message: string;
    stack?: string;
    path?: string;
}

export interface CheckoutRequest {
    products: [any]
    user: '',

}

export interface SessionRequest {
    products: [selectProduct]
    buyer: {
        id: string
    }
}

interface selectProduct {
    id: string
    price: any;
    quantity: number;
}

interface selectUser {
    id: string;
}