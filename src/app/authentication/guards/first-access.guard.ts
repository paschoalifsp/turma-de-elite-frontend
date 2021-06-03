import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {catchError, map, switchMap, take, tap} from "rxjs/operators";

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
    return this.auth.verifyFirstAccess(route?.queryParams['token'] as string)
      .pipe(
        map(value => true)
      );
  }

}
