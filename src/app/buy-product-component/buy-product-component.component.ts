import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { retry } from 'rxjs';



declare var Razorpay: any;
@Component({
  selector: 'app-buy-product-component',
  templateUrl: './buy-product-component.component.html',
  styleUrls: ['./buy-product-component.component.css']
})
export class BuyProductComponentComponent implements OnInit {
 constructor (private activatedRoute : ActivatedRoute,
  private productService : ProductService,
  private router : Router){ }

 productDetails : Product[] = [];
 isSingleProductCheckout : any;
 
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout")

    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId : x.productId, quantity :1}
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails)
  }

  orderDetails : OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  }

  public placeOrder(orderForm : NgForm){
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (response : any)=>{
        console.log(response);
        orderForm.reset();
        this.router.navigate(["/orderConfirmation"]);

      },
      (err: HttpErrorResponse)=>{
        console.log(err)
      }

    );
  }

  getQuantityForProduct(productId: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId === productId
    );
    return filteredProduct[0];

  }


  getCalculatedTotal(productId: any,productDiscountedPrice: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;


  }

  onQuantityChanged(quantity:any,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=> orderProduct.productId === productId
    )[0].quantity = quantity;

    
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
       const price =  this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }


 


  createTransactionAndPlaceOrder(orderForm : NgForm){
    let amount = this.getCalculatedGrandTotal();

    this.productService.createTransaction(amount).subscribe(
      (response: any)=>{
        console.log(response);
        this.openTransactionModal(response,orderForm); 
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
      }
    );

  }


  openTransactionModal(response : any,orderForm : NgForm){

    var options = {
      order_id: response.orderId,
      key: response.key,
      amount : response.amount,
      currency : response.currency,
      name : 'Haile E-commerce',
      description : 'Payment Of Your Orders',
      image : 'https://pixabay.com/photos/image-8342827/',
      handler: (response : any)=>{

        if(response!=null && response.razorpay_payment_id !=null){

          this.processResponse(response,orderForm);

        }else{
          alert("payment failed")
        }


        

      },
      prefill : {
        name : "LPY",
        email:"LPY@gmail.com",
        contact : '0741480606'
      },
      notes: {
        address : 'Online shopping',
      },
      theme: {
        color : '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  
  }


  processResponse(resp : any,orderForm : NgForm){
    console.log(resp); 

    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);

  }

}
