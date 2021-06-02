import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {map, switchMap, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirstAccessGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth
      .verifyFirstAccess(route?.queryParams['token'] as string)
      .pipe(
        take(1),
        tap(console.log),
        map(value => !!value)
      );
  }

}
