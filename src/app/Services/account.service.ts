import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe,} from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterUser } from '../Models/registerUser';
import { LoginUser } from '../Models/loginUser';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  path: string = environment.gatewayURL;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  public authenticate(loginUser: LoginUser) {
    return this.http.post(`${this.path}/Account/Validate`, loginUser).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        const payLoad = this.parseJwt(user.token);
        localStorage.setItem('role', payLoad.role);
        localStorage.setItem('username', payLoad.nameid);
        localStorage.setItem('email', payLoad.email);
        localStorage.setItem('mobilephone', payLoad.mobilephone);
        localStorage.setItem('Id', payLoad.Id);
      }
    }));
  }

  public register(user: RegisterUser) {
    const _user  = this.http.post(`${this.path}/Account/AddUser`, user);
    return this.http.post(`${this.path}/Account/ConfirmationEmail`, _user);
  }

  public updateProfile(user: User) {
    return this.http.put(`${this.path}/Account/UpdateUser`, user);
  }

  public isTaken(username: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.path}/Account/isTaken/${username}`);
  }

  public isAuthenticated():boolean{
    return !this.jwtHelper.isTokenExpired(this.getAuthToken());
  }

  public getAuthToken():string{
    return localStorage.getItem('token');
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
