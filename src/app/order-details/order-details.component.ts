import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns = ["Id","Product Name","Name", "Address", "Contact","Status","Action"];

  dataSources : MyOrderDetails[] = [];


  constructor (private productService : ProductService) { }

  status : string = "All";
 
 
 
 
  ngOnInit(): void {

    this.getAllProductdetails(this.status);
    
  }


  getAllProductdetails(statusParam : string){
    this.productService.getAllOrderDetails(statusParam).subscribe(
      (resp: MyOrderDetails[])=>{
       // console.log(resp);
        this.dataSources = resp;
      },
      (err: HttpErrorResponse)=>{
        console.log(err)
      }
    );
  }


  markAsdelivered(orderId: any){
    console.log(orderId);
    this.productService.markOrderAsDelivered(orderId).subscribe(
      (res: any)=>{
       // console.log(res);
        this.getAllProductdetails(this.status);
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
      }
    );
  }

}
