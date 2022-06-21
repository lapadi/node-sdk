import { LapadiConfig } from '../../lapadi';
/**
 * Shop
 */
export declare class Shop {
    /**
     * Config  of shop
     */
    _config: LapadiConfig;
    cart: Cart;
    /**
     * Creates an instance of shop.
     * @param _config
     */
    constructor(_config: LapadiConfig);
    session(body: any): Promise<unknown>;
}
declare class Cart {
    _config: LapadiConfig;
    private _items;
    constructor(_config: LapadiConfig);
    get items(): any[];
    set items(items: any[]);
    add(): void;
    update(): void;
    remove(): void;
}
export {};
//# sourceMappingURL=Shop.d.ts.map