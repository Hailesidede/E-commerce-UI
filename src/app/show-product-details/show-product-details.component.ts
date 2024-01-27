import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingServiceService } from '../_services/image-processing-service.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{

  productDetails : Product[] = [];

  showTable = false;
  showLoadMoreProductButton = false;

  pageNumber : number = 0;

  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price','Product Actual Price','Actions'];

  constructor (private productService : ProductService,
    public imagesDialog : MatDialog,
    private imageProcessingService : ImageProcessingServiceService,
    private router : Router) { }

  ngOnInit(): void{
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: any){
      console.log(searchkeyword);
      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProducts(searchkeyword);
  }


  public getAllProducts(searchKeyword : string = "") {
    this.showTable= false;
    this.productService.getAllProducts(this.pageNumber,searchKeyword)
      .pipe(
        map((products: Product[]) => products.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.showTable= true;
          resp.forEach(product => this.productDetails.push(product));

          if(resp.length === 12){
            this.showLoadMoreProductButton = true;
          }else{
            this.showLoadMoreProductButton= false;
          }
          //this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadMoreProducts(){
    this.pageNumber = this.pageNumber+1;
    this.getAllProducts();

  }
  


  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (res)=>{
        console.log(res);
        this.getAllProducts();
      },
      (err: HttpErrorResponse)=>{
        console.log(err)
      }
    );

  }

  showImages(product : Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data : {
        images : product.productImages 

      },
      height: '500px',
      width:'800px'
    });
  }


  editProductDetails(productId : number ){
   this.router.navigate(['/addNewProduct',{productId : productId}])
  }

  

}
