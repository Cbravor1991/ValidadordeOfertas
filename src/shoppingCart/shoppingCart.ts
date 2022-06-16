import { Calendar } from '../objectRule/calendar';
import { Payment } from '../objectRule/payment';
import {Product} from '../objectRule/product'
import { PurchasedProduct } from '../objectRule/purchasedProduct';
import {Offer} from '../offer/offer'
import {Offers} from '../offer/offers'

export class ShoppingCart{

    private products: Array<PurchasedProduct>;
    private payment: Payment;
    private calendar: Calendar;
    private offers: Offers;

    constructor(payment: Payment, calendar: Calendar){
        this.products = new Array<PurchasedProduct>();
        this.offers = new Offers();
        this.payment = payment;
        this.calendar = calendar;
    }

    add(product: Product): void{
        this.products.push(new PurchasedProduct(product, this.payment, this.calendar));
    }

    applyOffer(offer: Offer): void{
        this.offers.add(offer);
    }
    
    quantityOfProducts(): number{
        return this.products.length;
    }

    calculateCost(): number{
        var cost = 0;
        for(let product of this.products){
            cost += this.offers.calculatePrice(product);
        }
        return cost;
    }

    discountedProductList(): Array<PurchasedProduct>{
        const array = new Array<PurchasedProduct>();
        for(let product of this.products){
            if(this.offers.isAnyOfferApply(product)){
                array.push(product);
            }
        }
        return array;
    }
}