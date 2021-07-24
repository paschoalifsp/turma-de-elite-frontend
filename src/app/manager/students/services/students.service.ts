import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  isLoading = false;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  registerStudent(value: any) {
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.post<any>(`${environment.apiUrl}/api/students`, {language,...rest});
  }

  getStudents(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/students?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getStudentById(studentId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/students/${studentId}`).pipe(take(1));
  }

  updateStudent(studentId: number | null, value: any) {
    this.isLoading = true;
    const {school,...rest} = value;
    const language = this.translateService.currentLang;
    return this.http.put<any>(`${environment.apiUrl}/api/students/${studentId}`, {language,...rest});
    this.isLoading = false;
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

  findByRegistrySimilarity(registry: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/students/registry/${registry}`)
  }
}
