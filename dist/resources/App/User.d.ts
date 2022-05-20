import { LapadiConfig } from "../../types";
export declare class User {
    _config: LapadiConfig;
    address: Address;
    constructor(_config: LapadiConfig);
}
export declare class Address {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    list(filter: any): void;
    show(id: string): void;
    update(id: string, data: any): void;
    delete(id: string): void;
}
//# sourceMappingURL=User.d.ts.map