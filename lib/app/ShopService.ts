import qs from 'qs';
import { CheckoutRequest, SessionRequest, ItemInterface, LapadiRequestConfig, _ItemInterface } from "../helpers/constants";
import { CacheModule } from "../modules";

import { list, save, clear } from "../utils/localstorage";

class ShopService {

    cartId = 'lapadi_app_shop_cart'
    cache: CacheModule
    count: number;
    total: number;
    items: any[];
    localCart: any;
    lapadi_api_endpoint: string
    lapadi_user_token = '';
    lapadi_app_token: string;
    session_data: any;

    constructor(config: LapadiRequestConfig){
        this.cartId = this.cartId;
        this.cache = new CacheModule({ttlSec: 6000, maxLength: 10000})
        this.lapadi_api_endpoint = config.lapadi_api_endpoint;
        this.lapadi_app_token = config.lapadi_app_token;
        this.count = 0;
        this.total = 0;
        this.items = this.getCart();
        this.localCart = this.cache.get(this.cartId);
        this.session_data;
       
       
        


    }

    checkCart(){
       
        
    }

    public async getItems() {
        
        return this.items;
    }
    

    public async setItems(items: any) {
        this.items = items;
        for (let i = 0; i < this.items.length; i++) {
            let _item: any = this.items[i];
            this.total += _item.total;
        }
    }

    public async clearItems() {
        this.items = [];
        this.total = 0;
        this.clearCart();
    }

    async addItem(item: any) {
        let itemData = {
            id: item.id,
            quantity: 1,
            price: item.price.value,
            total: item.price.value,
            data: item
        }
        console.log("[MODLE] add item: ", itemData)
        if (this.containsItem(itemData.id) === false) {
            this.items.push(itemData);
            this.saveCart(this.items);
        } else {
            this.updateItem(itemData);
        }
        this.total += itemData.price * itemData.quantity;
        this.count += itemData.quantity;
    
        
    }

    async incresItem(item: any) {
        console.log("[MODLE] incresItem: ", item)
        if (this.containsItem(item.id) === false) {
            this.items.push(item);
            this.saveCart(this.items);
        } else {
            this.updateItem(item);
        }
    }

    async decreaseItem(item: any) {
        console.log("[MODLE] decreaseItem: ", item)
        for (let i = 0; i < this.items.length; i++) {
            let _item: _ItemInterface = this.items[i];
            if (item.id === _item.id) {

                _item.quantity = parseInt(_item.quantity) - 1;
                console.log("quantitiy: ", parseInt(_item.quantity) - 1)
                _item.total = parseInt(_item.total) - parseInt(item.price);
                this.items[i] = _item;
                this.saveCart(this.items);
            }
        }
    }

    containsItem(id: string) {
        if (this.items === undefined) return false;
        for (let i = 0; i < this.items.length; i++) {
            let _item = this.items[i];
            if (id == _item.id) return true;
        }
        return false;
    }

    async updateItem (object: any) {
        return new Promise((resolve, reject) => {
            console.log("[MODLE] update item: ", object)
            for (let i = 0; i < this.items.length; i++) {
                let _item: _ItemInterface = this.items[i];
                if (object.id === _item.id) {
    
                    _item.quantity = parseInt(_item.quantity) + 1;
                    _item.total = parseInt(_item.total) + parseInt(object.price);
                    this.items[i] = _item;
                    return this.saveCart(this.items).then((res) => resolve(res)).catch((err) => reject(err));
                }
            }
        })
        
    }

    async saveCart (objects: any) {
        return new Promise(async (resolve, reject) => {
            return await save(objects, this.cartId)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        })
    }
    getCart () {
        let cartItems: any = [];
        
            const checkData = list(this.cartId);
    
            console.log("[MODLE] get cart: ", checkData)

            if (typeof checkData !== "undefined") {
                cartItems = checkData;
            }
 
        return cartItems;
       
    }

    clearCart() {
        clear(this.cartId);
    }

    async session(data: SessionRequest) {

        const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/shop/checkout/session`;
        const parameters: RequestInit = {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.lapadi_app_token,
          },
          body: qs.stringify(data)
        };

        return new Promise( async (resolve, reject) => {
            return await fetch(API_ENDPOINT, parameters)
          .then(res => res.json())
          .then(res => resolve(res))
          .catch(error => reject(error));
        })
    }

    async checkout(data: CheckoutRequest) {

        const API_ENDPOINT = `${this.lapadi_api_endpoint}/integrations/shop/checkout`;
        const parameters: RequestInit = {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.lapadi_app_token,
            'token': ''
          },
          body: qs.stringify(data)
        };
    
        return await fetch(API_ENDPOINT, parameters)
          .then(res => res.json())
          .then(res => res)
          .catch(error => error);
    }
}

export {
    ShopService
}