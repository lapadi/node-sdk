"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LapadiProvider = exports.CartContext = void 0;
const react_1 = __importStar(require("react"));
const initialState = {
    cart: [],
    totalItems: 0,
    totalAmount: 0,
    bounce: false,
};
exports.CartContext = (0, react_1.createContext)(initialState);
const LapadiProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(cartReducer, initialState);
    const removeProduct = (id) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: id,
        });
    };
    const addProduct = (selectedProducts) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: selectedProducts,
        });
    };
    const bouceEnd = () => {
        dispatch({
            type: 'BOUNCE_END',
        });
    };
    return (react_1.default.createElement(exports.CartContext.Provider, { value: {
            cart: state.cart,
            totalItems: state.totalItems,
            totalAmount: state.totalAmount,
            bounce: state.bounce,
            removeProduct,
            addProduct,
            bouceEnd,
        } }, children));
};
exports.LapadiProvider = LapadiProvider;
function letPrice(value) {
    return Number(value);
}
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE_PRODUCT': {
            const newCart = state.cart.filter((x) => x.id !== action.payload);
            const newTotalItems = newCart.length;
            const newTotalAmount = newCart.reduce((acc, currentProduct) => acc + letPrice(currentProduct.price.value) * currentProduct.quantity, 0);
            return Object.assign(Object.assign({}, state), { cart: newCart, totalItems: newTotalItems, totalAmount: newTotalAmount });
        }
        case 'ADD_PRODUCT': {
            const newCart = [...state.cart];
            const productID = action.payload.id;
            const productQty = action.payload.quantity;
            const isExist = newCart.findIndex((element) => element.id === productID);
            if (isExist !== -1) {
                newCart[isExist].quantity += productQty;
            }
            else {
                newCart.push(action.payload);
            }
            const newTotalItems = newCart.length;
            const newTotalAmount = newCart.reduce((acc, currentProduct) => acc + letPrice(currentProduct.price.value) * currentProduct.quantity, 0);
            return Object.assign(Object.assign({}, state), { cart: newCart, totalItems: newTotalItems, totalAmount: newTotalAmount, bounce: true });
        }
        case 'BOUNCE_END':
            return Object.assign(Object.assign({}, state), { bounce: false });
        default:
            return state;
    }
};
