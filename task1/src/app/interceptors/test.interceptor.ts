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
        
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : 'not found',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("OK", event);
                    return event;
                }
                return event;
            }))
    }
}