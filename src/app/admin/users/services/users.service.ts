import { Injectable } from '@angular/core';
import User from "../../../shared/model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    ) { }

  createNewUser(user: User){
    const language = this.translateService.currentLang;
    return this.http.post(`${environment.apiUrl}/api/admin`,{...user,language}).pipe(take(1));
  }

  getAdminUsers(pageSize: number, pageNumber: number){
    return this.http.get<any>(`${environment.apiUrl}/api/admin?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getUserById(userId: any): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/admin/${userId}`).pipe(take(1));
  }

  findUserByNameSimilarity(value: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/admin/name/${value}`).pipe(take(1));
  }

  updateUser(userId: number, user: User) {
    return this.http.put<any>(`${environment.apiUrl}/api/admin/${userId}`,user).pipe(take(1));
  }


}
