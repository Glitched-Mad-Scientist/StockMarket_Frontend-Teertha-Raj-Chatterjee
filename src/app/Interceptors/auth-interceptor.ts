import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(req:HttpRequest<any>, next:HttpHandler){
        const authToken:string = localStorage.getItem("token");
        req = req.clone({
            headers: req.headers
                .set('Authorization', 'Bearer ' + authToken)
                .set('Content-Type', 'application/json')
        });
        return next.handle(req);
    }
}
