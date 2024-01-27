import { Product } from "./product.model";

export interface MyOrderDetails {

    orderId : number;
    orderFullName : string;
    orderFullAddress: string;
    orderContactNumber: string;
    orderAlternateContact : string;
    orderStatus : string;
    orderAmount : number;
    product : Product;
    user : any;
 
 
 

}