import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService : UserService,
    private router : Router){ }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  registerUser(registerForm : NgForm){
    this.userService.register(registerForm.value).subscribe(
      (resp : any)=>{
        console.log(resp);
        this.router.navigate(['/login'])
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    );
    

  }




}
