import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.domain + '/users')) {
            console.log("inerceptor", req);
            const paramReq = req.clone({
                
            });
            return next.handle(paramReq);
        } else {
            console.log("interceptor err", req);
            return next.handle(req);
        }
    }
}