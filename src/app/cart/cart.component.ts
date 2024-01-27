import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor (private productservice : ProductService,
    private router : Router){ }

  displayedColumns : string[] = ['Name','Description','Price','Discounted Price','Action'];
  cartDetails : any = [];
 
 
 
  ngOnInit(): void {
    this.getCartdetails();
  }

  getCartdetails(){
    this.productservice.getCartDetails().subscribe(
      (resp: any)=>{
        console.log(resp);
        this.cartDetails = resp;
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
      }
    );
  }


  checkOut(){

    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false, id: 0
    }])


    // this.productservice.getProductDetails(false,0).subscribe(
    //   (resp: any)=>{
    //     console.log(resp);
    //   },
    //   (err: HttpErrorResponse)=>{
    //     console.log(err);
    //   }
    // )
  }


  delete(cartId: any){
    console.log(cartId);

    this.productservice.deleteCartItem(cartId).subscribe(
      (res: any)=>{
        console.log(res);
        this.getCartdetails();
      },
      (err: HttpErrorResponse)=>{
        console.log(err)
      }
    );
  }

  

}
