import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';



interface LoginResponse {
  jwtToken: string;
  user: {
    role: string[];
   
  };
  
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router : Router) { }

  // loginForm: NgForm | undefined;



  login(loginForm: NgForm) {
    console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response:any) => {
       // console.log(response);
  
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
  
        const role = response.user.role[0].roleName;
  
        if (role === 'Admin') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  registerUser(){
    this.router.navigate(["/registerNewUser"])
  }
  

}
