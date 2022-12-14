import { TypeProduct } from "../type/typeProduct";
import { Calendar } from "./calendar";
import { ObjectRule } from "./objectRule";
import { Payment } from "./payment";
import { Product } from "./product";

export class PurchasedProduct extends ObjectRule{

    constructor(product: Product, payment: Payment, calendar: Calendar){
        super();
        this.dictionary.set("PRODUCT", product);
        this.dictionary.set("PAYMENT", payment);
        this.dictionary.set("CALENDAR", calendar);
    }

    getCode(): string{
        return this.dictionary.get("PRODUCT").getCode();
    }

    calculatePrice(): number{
        return this.dictionary.get("PRODUCT").calculatePrice();
    }

    getProduct(): TypeProduct{
        return this.dictionary.get("PRODUCT").getProduct();
    }
}