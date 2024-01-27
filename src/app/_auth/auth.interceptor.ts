import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { UserService } from "../_services/user.service";
import { UserAuthService } from "../_services/user-auth.service";
import { Token } from "@angular/compiler";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private userAuthService : UserAuthService,
        private router : Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        if(req.headers.get('No-Auth')=== 'true'){
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken() || '';
        req = this.addToken(req,token);
        console.log(req);

        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse)=>{
                    console.log(err.status);

                    if(err.status === 401){
                        this.router.navigate(['/login']);

                    }else if(err.status === 403){
                        this.router.navigate(['/forbidden'])
                    }
                    return throwError("Something is wrong");
                }
            )
        )
    }


    private addToken (request: HttpRequest<any>, token : string){
        return request.clone(
            {
                setHeaders:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
    }

    

}