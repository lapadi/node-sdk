import React from 'react';
declare type Product = {
    price: {
        id: string;
        value: any;
    };
    image: string;
    name: string;
    quantity: number;
    unit: string;
};
export declare type ProductWeb = Product & {
    id: string;
};
export declare type ProductLocal = Product & {
    id: number;
};
export declare type QuickPreview = {
    id: number;
    price: {
        id: string;
        value: any;
    };
    image: string;
    name: string;
};
export interface Init {
    cart: ProductLocal[];
    totalItems: number;
    totalAmount: number;
    bounce: boolean;
    removeProduct?: (id: number) => void;
    addProduct?: (selectedProducts: ProductLocal) => void;
    bouceEnd?: () => void;
}
export declare const CartContext: React.Context<Init>;
export declare const LapadiProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export {};
