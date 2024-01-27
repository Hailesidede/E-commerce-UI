import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"NO-AUTH": "true"}
  )

  public login(loginData: any) {
    return this.httpClient.post("http://localhost:9090/authenticate", loginData, {headers: this.requestHeader});
  }

  public forAdmin(){
    this.httpClient.get(this.PATH_OF_API +'/forAdmin',{responseType:"text"});
  }

  public forUser() : Observable<any>{
   return this.httpClient.get(this.PATH_OF_API +'/forUser',{responseType:"text"});
  }




public roleMatch(allowedRoles: string[]): boolean {
  let isMatched = false;
  const userRoles: any = this.userAuthService.getRoles();

  if (userRoles != null && userRoles) {
    for (let i = 0; i < userRoles.length; i++) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles[i].roleName === allowedRoles[j]) {
          isMatched = true;
          return isMatched;
        }
      }
    }
  }

  return isMatched; // this ensures a return statement outside the loops
}


public register(registerData: any){
  return this.httpClient.post<any>(this.PATH_OF_API+'/registerNewUser',registerData);

}

}
