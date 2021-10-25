import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {iif, Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {concatMap, take} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthenticationService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.isSynchronizedWithClassroom = route.queryParams['authenticationSuccess'];
    return this.firebaseAuth.user.pipe(
      concatMap(user => {
        if(user!=null){
          return this
                  .getRole()
                  .pipe(
                    concatMap(role => of(this.redirectAccordingToRole(role)))
                  );
        }else{
          return of(this.router.createUrlTree(['/login']));
        }
      })
    )
  }


  private redirectAccordingToRole(role: string){
    switch (role){
      case 'ADMIN':
        return this.router.createUrlTree(['/admin/dashboard']);
      case 'STUDENT':
        return this.router.createUrlTree(['/student/dashboard']);
      case 'TEACHER':
        return this.router.createUrlTree(['/teacher/dashboard']);
      case 'MANAGER':
        return this.router.createUrlTree(['/manager/dashboard']);
      default:
        return this.router.createUrlTree(['/login']);
    }
  }

  getRole(){
    return this.http.get<string>(`${environment.apiUrl}/api/roles`,{responseType: 'text' as 'json'})
      .pipe(take(1));
  }

}
