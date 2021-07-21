import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {catchError, map, switchMap, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirstAccessGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.verifyFirstAccess(route?.queryParams['token'] as string)
      .pipe(
        tap(console.log),
        map(value => true),
        catchError((err, caught) => {
          console.log(err);
          if(err.status == 409){
            return of(this.router.parseUrl('/first-access/already-done'));
          }else{
            return of(false);
          }

        }),
        tap(console.log)
      );
  }

}
