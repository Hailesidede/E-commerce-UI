import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = ["Name", "Address", "ContactNumber", "Amount", "Status"];

  myOrderDetails : MyOrderDetails [] = [];


  constructor( private productService : ProductService){ }
 
 
 
  ngOnInit(): void {
    this.getOrderDetails();
  }


  getOrderDetails(){
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[])=>{
        console.log(resp);
        this.myOrderDetails = resp;
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
      }
    );
  }
}
