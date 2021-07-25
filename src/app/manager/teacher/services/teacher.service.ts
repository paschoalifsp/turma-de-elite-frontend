import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import Teacher from 'src/app/shared/model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  isLoading = false;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  registerTeacher(value: any) {
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.post<any>(`${environment.apiUrl}/api/teachers`, {language,...rest});
  }

  getTeachersUsers(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/teachers?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getTeacherById(managerId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/teachers/${managerId}`).pipe(take(1));
  }

  updateTeacher(managerId: number | null, value: any) {
    this.isLoading = true;
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.put<any>(`${environment.apiUrl}/api/teachers/${managerId}`, {language,...rest});
    this.isLoading = false;
  }

  findTeacherByNameSimilarity(value: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${environment.apiUrl}/api/teachers/name/${value}`).pipe(take(1));
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

  findByEmailSimilarity(email: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/teachers/email/${email}`).pipe(take(1));
  }
}
