import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService){

    }
    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.authService.isAuthenticated();
    }

}