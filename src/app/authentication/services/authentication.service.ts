import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import firebase from "firebase";
import {flatMap, map, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User | null>;
  isAuthenticated: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.user = afAuth.user;
    this.isAuthenticated = afAuth.authState.pipe(map(user => user != null));
  }

  getToken(): Observable<string>{
    return this.user.pipe(
      flatMap(user => user ? from(user.getIdToken(true)) : '')
    );
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  async logout(){
    await this.afAuth.signOut();
  }

  doAdminFirstAccess(email: string) {
    return this.http.put(`${environment.apiUrl}/auth/first-access/admin`,{email}).pipe(take(1))
  }

  verifyFirstAccess(firstAccessToken: string){
    return this.http.post(`${environment.apiUrl}/auth/first-access/admin/verify-token`, firstAccessToken).pipe(take(1))
  }
}
