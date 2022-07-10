import { LapadiConfig } from "../types";
export declare class User {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    /**
     * Lists address
     * @returns
     */
    list(): Promise<unknown>;
    show(id: string): void;
    update(id: string, data: any): void;
    delete(id: string): void;
}
//# sourceMappingURL=User.d.ts.map