import { LapadiConfig, FilterGateway } from "../../types";
export declare class Gateway {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    /**
     * Lists gateway
     * @param filter
     * @returns
     */
    list(filter: FilterGateway): Promise<unknown>;
}
//# sourceMappingURL=Gateway.d.ts.map