import { LapadiConfig } from '../../lapadi';
/**
 * Shop
 */
export declare class Shop {
    /**
     * Config  of shop
     */
    _config: LapadiConfig;
    items: any[];
    cart: Cart;
    /**
     * Creates an instance of shop.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    session(): void;
}
declare class Cart {
    _config: LapadiConfig;
    constructor(_config: LapadiConfig);
    add(): void;
    update(): void;
    remove(): void;
}
export {};
//# sourceMappingURL=Shop.d.ts.map