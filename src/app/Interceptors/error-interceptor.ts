import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private flashMessage: FlashMessagesService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error ${error.status} - ${error.error}`;
                    }
                    this.flashMessage.show( errorMessage, {cssClass: 'alert-danger', timeout: 4000} );
                    console.log(error);
                    return throwError(errorMessage);
                }));
    }
}