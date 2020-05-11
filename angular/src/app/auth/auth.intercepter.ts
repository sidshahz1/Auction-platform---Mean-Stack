import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public userservice: UserService, private router:Router) { }

    intercept(req:HttpRequest<any>, next:HttpHandler){
        if(req.headers.get('noauth'))
            return next.handle(req.clone());
        else{
            const clonereq=req.clone({
                headers: req.headers.set("Authorization","bearer "+localStorage.getItem('token'))
            });
            return next.handle(clonereq).pipe(
                tap(
                    event=>{},
                    err=>{
                        if(err.error.auth==false){
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        }
    }
}
