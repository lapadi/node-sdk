import { LapadiRequestConfig } from "../helpers/constants";
import { CacheModule } from "../modules";
interface ContentConstants {
    list: (filter: ContentFilterType) => Promise<any | any>;
    detail: (id: string) => Promise<any | any>;
    update: (id: string, content: any) => Promise<any | any>;
}
declare const CONTENT_STATUS: string[];
export interface ContentResponse {
    product?: [];
    category?: [];
    article?: [];
}
export interface ContentFilterType {
    product?: ContentFilter;
    category?: ContentFilter;
    article?: ContentFilter;
}
export interface ContentFilter {
    pagination: {
        page: number;
        per: number;
    };
    relations?: [];
    filter: {
        status: {
            path: typeof CONTENT_STATUS;
        };
        created?: {
            start?: Date;
            end?: Date;
        };
        updated?: {
            start?: Date;
            end?: Date;
        };
        deleted?: {
            start?: Date;
            end?: Date;
        };
    };
}
declare class ContentService implements ContentConstants {
    cache: CacheModule;
    lapadi_app_token: string;
    lapadi_api_endpoint: string;
    constructor(config: LapadiRequestConfig);
    req(filter: ContentFilterType): Promise<any>;
    list(filter: ContentFilterType): Promise<any | any>;
    detail(id: string): Promise<any | any>;
    update(id: string, input: any): Promise<any | any>;
    private trimFilter;
}
export { ContentService };
