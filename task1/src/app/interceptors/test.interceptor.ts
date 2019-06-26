import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ErrorDialogService } from '../services/error-dialog.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    constructor(private errorDialogService: ErrorDialogService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        catchError((error: HttpErrorResponse) => {
            let data = {};
            data = {
                reason: error && error.error.reason ? error.error.reason : '',
                status: error.status
            };
            this.errorDialogService.openDialog(data);
            console.log("err", error);
            return throwError(error);
        })
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("OK", event);
                    return event;
                }
                return event;
            }))
    }
}