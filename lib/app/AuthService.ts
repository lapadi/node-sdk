import cookie from 'js-cookie';
import qs from 'qs';
import { OrderService } from "./OrderService"
import { LapadiRequestAuthConfig, LapadiRequestConfig } from "../helpers/constants"

import { fetcher } from "../utils/fetch"

interface RegisterRequest {
    name: string;
    surname: string;
    full_name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;

}

interface UpdatePasswordRequest {
    email: string
    password: string
    newPassword: string
    newPasswordConfirmation: string
}
interface RecoveryPasswordRequest {
    email: string
}
interface ConfirmAccountRequest {
    code: string
    email: string
}

interface LoginResponse {
  email: string
  password: string
}

class AuthService {

    order: OrderService
    token: string | undefined
    lapadi_api_endpoint: string
    lapadi_app_token: string

    constructor(config: LapadiRequestConfig){
        this.token = this._token() as string;
        this.order = new OrderService({
            ...config, 
            lapadi_user_token: this.token
        });
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this._token();
    }
 
    public async me(): Promise<any | any> {
      console.log("[MODULE]: token: ", this.token);
      if(!this.token) return;
      let response: {
        loading?: boolean
        errors?: any[] | boolean
        data?: any | boolean
      } = {
        loading: true,
      };
   
      const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/me`;
      const res = await fetcher('GET', API_ENDPOINT, {
        token: this.token,
        lapadi_app_token: this.lapadi_app_token
      });
   
      return {
        ...response,
        ...res,
        loading: false,
      };
    }

    public async login(data: LoginResponse): Promise<any| any> {
      console.log("[MODULE]: login values: ", data);
      if(!data) return;
      let response = {
        loading: true,
        errors: false,
        data: false,
      }
      const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/login`;
    
      const res: any =  await fetcher('POST', API_ENDPOINT, {
        lapadi_app_token: this.lapadi_app_token,
        body: data
      });
      if(res.data.token){
        cookie.set('token', res.data.token, { expires: 14 });
        // save the userId from the login response in a cookie
        cookie.set('appUserId', res.data.user.id, { expires: 14 });
      };
      return {
        ...response,
        ...res,
        loading: false
      };
    }

    public async register(data: RegisterRequest): Promise<any | any> {
      if(!data) return;
        let response = {
          loading: true,
          errors: false,
          data: false,
        }
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/register`;
        const res: any = await fetcher('POST', API_ENDPOINT, {
          lapadi_app_token: this.lapadi_app_token,
          body: data
        });
        if(res.data.token){
          cookie.set('token', res.data.token, { expires: 14 });
          // save the userId from the login response in a cookie
          cookie.set('appUserId', res.data.user.id, { expires: 14 });
        };
        return {
          ...response,
          ...res,
          loading: false
        };
    }

    public async updatePassword(data: UpdatePasswordRequest) {
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/update_password`;
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

    public async recovery(data: RecoveryPasswordRequest){
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/recovery_password`;
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

    public async confirm(data: ConfirmAccountRequest) {
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/auth/account_confirmation`;
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

    async logout(){
      let response = {
        loading: true,
        errors: false,
      }
      try {
        
        cookie.remove('appUserId');
        cookie.remove('token');
        this.token = undefined;
        return true;
      } catch (error) {
        return error
      }
    }

    async update(id: string, data: any) {
      console.log("[MODULE]: update values: ", id, data);
      let response = {
        loading: true,
        errors: false,
      }
      if(!data || !id || !this.token) {
        return {
          ...response,
          errors: [{
            message: "Invalid token! or Data not provide!",
          }]
        }
      };
      const API_ENDPOINT = `${this.lapadi_api_endpoint}/users/${id}`;
      const res: any = await fetcher('PATCH', API_ENDPOINT, {
        lapadi_app_token: this.lapadi_app_token,
        token: this.token,
        body: data
      });
      return {
        ...response,
        ...res,
        loading: false
      };
    }

    // eslint-disable-next-line import/prefer-default-export
    _token(){
        let data;
        if (typeof window !== 'undefined') {
            data = cookie.get('token');
            console.log('You are on the browser');
            // 👉️ can use localStorage here
            this.token = data as string;
        }
        return data;
    };


}

export { AuthService }