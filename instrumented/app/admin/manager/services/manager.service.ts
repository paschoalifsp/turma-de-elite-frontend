import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) { }

  registerManager(value: any) {
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.post<any>(`${environment.apiUrl}/api/managers`, {schoolId: school.id,language,...rest});
  }

  getManagersUsers(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/managers?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getManagerById(managerId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/managers/${managerId}`).pipe(take(1));
  }

  updateManager(managerId: number | null, value: any) {
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.put<any>(`${environment.apiUrl}/api/managers/${managerId}`, {schoolId: school.id,language,...rest});
  }
}
