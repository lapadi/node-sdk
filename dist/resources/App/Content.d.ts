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
     * @param id
     * @returns
     */
    comments(id: string): Promise<unknown>;
}
//# sourceMappingURL=Content.d.ts.map