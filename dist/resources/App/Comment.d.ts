import { LapadiConfig } from '../../lapadi';
/**
 * Content
 */
export declare class Comment {
    /**
     * Config  of autth
     */
    _config: LapadiConfig;
    /**
     * Creates an instance of auth.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    /**
     * Comments content
     * @param filter
     * @returns
     */
    comments(filter: any): Promise<unknown>;
    addComment(body: any): Promise<unknown>;
}
//# sourceMappingURL=Comment.d.ts.map