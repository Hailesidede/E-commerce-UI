import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedImage = 0;

  product! : Product;

  constructor(private activatedRoute: ActivatedRoute,
    private router : Router,
    private productService : ProductService ){ }
  
  
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product); 
  }


  changeIndex(index: any){
    this.selectedImage= index;

  }

  buyProduct(productId : any){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: true, id: productId
    }])
     
  }

  addToCart(productId : any){
    return this.productService.addToCart(productId).subscribe(
      (resp : any)=>{
        console.log(resp);
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
