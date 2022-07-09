import { LapadiConfig } from '../../lapadi';
import { FilterContent } from '../../types';
/**
 * Content
 */
export declare class Content {
    /**
     * Config  of autth
     */
    _config: LapadiConfig;
    /**
     * Creates an instance of content.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    list(filter: FilterContent): Promise<any | any>;
    detail(slug: string): Promise<unknown>;
    /**
     * Comments content
     * @param filter
     * @returns
     */
    comments(filter: any): Promise<unknown>;
    addComment(body: any): Promise<unknown>;
}
//# sourceMappingURL=Content.d.ts.map