import { Injectable } from '@angular/core';
import User from "../../../shared/model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private translateService: TranslateService) { }

  createNewUser(user: User){
    const language = this.translateService.currentLang;
    return this.http.post(`${environment.apiUrl}/api/admin`,{...user,language}).pipe(take(1));
  }
}
