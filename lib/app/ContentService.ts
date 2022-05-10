const querystring = require('querystring');
import { LapadiRequestConfig } from "../helpers/constants";
import { CacheModule } from "../modules"

import { fetcher } from "../utils/fetch"

interface ContentConstants {
    list: (filter: ContentFilterType) =>  Promise<any | any>
    detail: (id: string) => Promise<any | any>
    update: (id: string, content: any) => Promise<any | any>
}


const CONTENT_TYPES = ['category', 'product', 'article', 'news'];
const CONTENT_STATUS = ['active', 'pasive', 'deleted'];

export interface ContentResponse {
    product?: [],
    category?: [],
    article?: [],
  }
  
  export interface ContentFilterType {
    product?: ContentFilter
    category?: ContentFilter
    article?: ContentFilter
  }
  
  export interface ContentFilter {
      pagination: {
          page: number,
          per: number
      },
      relations?: [],
      filter: {
        status: {
            path: typeof CONTENT_STATUS
        },
        created?: {
            start?: Date
            end?: Date
        },
        updated?: {
            start?: Date
            end?: Date
        },
        deleted?: {
            start?: Date
            end?: Date
        }
      }
  }
  

class ContentService implements ContentConstants {

    cache: CacheModule
    lapadi_app_token: string;
    lapadi_api_endpoint: string
    
    constructor(config: LapadiRequestConfig) {
        this.cache = new CacheModule({ ttlSec: 600, maxLength: 10000 });
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token
        
    };

    async req(filter: ContentFilterType): Promise<any>{
       
        return new Promise((resolve, reject) => {
          const API_ENDPOINT = `${this.lapadi_api_endpoint}/contents?${this.trimFilter(filter)}`;

          console.log("API_ENDPOINT: ", API_ENDPOINT)
          const parameters: RequestInit = {
              method: 'GET',
              headers: {
                  // 'Content-Type': 'application/json'
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token': this.lapadi_app_token
              }
          };
          fetch(API_ENDPOINT, parameters)
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
       
    }

    public async list(filter: ContentFilterType): Promise<any | any> {

        //
          const request = (async () => await this.req(filter))();
          return request;
        //
        let cachedData;
        const checkData = this.cache.get(`app:${this.lapadi_app_token}:content:list`);

        if (typeof checkData !== "undefined") {
            cachedData = checkData;
        } else {
            const request = (async () => await this.req(filter))();
            await this.cache.get(
                `app:${this.lapadi_app_token}:content:list`,
                async () => {
                  return await request;
                }, 
                30
            );
            cachedData = request
        }
        return cachedData
    }

    public async detail(id: string): Promise<any | any> {
        const API_ENDPOINT = `${this.lapadi_api_endpoint}/contents/${id}`;
        const parameters: RequestInit = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.lapadi_app_token
            }
        };
        return await fetch(API_ENDPOINT, parameters)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error);
    }

    public async update(id: string, input: any): Promise<any | any> {
        
    }

    private trimFilter(data: ContentFilterType) : string {
        var isObj = function(a: any) {
            if ((!!a) && (a.constructor === Object)) {
              return true;
            }
            return false;
          };
          var _st = function(z: any, g: any) {
            return "" + (g != "" ? "[" : "") + z + (g != "" ? "]" : "");
          };
          var fromObject = function(params: any, skipobjects: any, prefix: any) {
            if (skipobjects === void 0) {
              skipobjects = false;
            }
            if (prefix === void 0) {
              prefix = "";
            }
            var result = "";
            if (typeof(params) != "object") {
              return prefix + "=" + encodeURIComponent(params) + "&";
            }
            for (var param in params) {
              var c = "" + prefix + _st(param, prefix);
              if (isObj(params[param]) && !skipobjects) {
                result += fromObject(params[param], false, "" + c);
              } else if (Array.isArray(params[param]) && !skipobjects) {
                params[param].forEach(function(item: any, ind: any) {
                  result += fromObject(item, false, c + "[" + ind + "]");
                });
              } else {
                result += c + "=" + encodeURIComponent(params[param]) + "&";
              }
            }
            return result;
          };

          return fromObject(data, null, 'filter')
    }
}

export {
    ContentService
}