import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable, of} from "rxjs";
import firebase from "firebase";
import {flatMap, map, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User | null>;
  isAuthenticated: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
  ) {
    this.user = afAuth.user;
    this.isAuthenticated = afAuth.authState.pipe(map(user => user != null));
  }

  getToken(): Observable<string>{
    return this.user.pipe(
      flatMap(user => user ? from(user.getIdToken()) : of(''))
    );
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email,password).then( result => {
      this.getRole().subscribe(role => {
        this.redirectAccordingToRole(role);
        if(role){
          if(this.isSynchronizedWithClassroom){
            this.authWithClassroom().subscribe( url => {
              window.open(url);
            });
          }
        }
      });
    });
  }

  private redirectAccordingToRole(role: string){
    switch (role){
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'STUDENT':
        this.router.navigate(['/student/dashboard']);
        break;
      case 'TEACHER':
        this.router.navigate(['/teacher/dashboard']);
        break;
      case 'MANAGER':
        this.router.navigate(['/manager/dashboard']);
        break;

    }
  }

  getRole(){
    return this.http.get<string>(`${environment.apiUrl}/api/roles`,{responseType: 'text' as 'json'})
      .pipe(take(1));
  }

  async logout(){
    await this.afAuth.signOut();
  }

  doAdminFirstAccess(email: string, password: string, firstAccessToken: string) {
    return this.http.post(
  `${environment.apiUrl}/first-access`,
  {
          email,
          password,
          firstAccessToken,
        }
      ).pipe(take(1));
  }

  verifyFirstAccess(firstAccessToken: string){
    return this.http.post(
    `${environment.apiUrl}/first-access/verify-token`,
        firstAccessToken,
      { responseType: "text" }
    ).pipe(take(1));
  }

  sendResetPasswordEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  authWithClassroom() {
    return this.http.get(`${environment.apiUrl}/api/classroom/auth`,{responseType: 'text'}).pipe(take(1));
  }

  get isSynchronizedWithClassroom(){
    return localStorage.getItem('isSynchronizedWithClassroom') === "true";
  }

  set isSynchronizedWithClassroom(isSynchronized){
    localStorage.setItem('isSynchronizedWithClassroom',`${isSynchronized}`);
  }
  
}
