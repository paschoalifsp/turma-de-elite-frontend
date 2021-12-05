import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  
  constructor(private http: HttpClient) { }
  
  createClass(classValue:any) {
    return this.http.post(`${environment.apiUrl}/api/class`,classValue).pipe(take(1));
  }

  closeClassroomClass(externalId: string | null) {
    return this.http.get<any>(`${environment.apiUrl}/api/external/courses/${externalId}/close-class`,{});
  }

  getExternalClasses(){
    return this.http.get<any>(`${environment.apiUrl}/api/external/courses`).pipe(take(1));
  }

  getExternalClassesFromAuthenticatedTeacher(){
    return this.http.get<any>(`${environment.apiUrl}/api/external/courses/authenticated-teacher`).pipe(take(1));
  }

  getExternalClassById(externalClassId: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/external/courses/${externalClassId}`).pipe(take(1));
  }

  getPaginatedClasses(pageSize:any, pageNumber:any){
    return this.http.get<any>(`${environment.apiUrl}/api/class?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getTeacherHimselfClassesPaginated(pageSize:any, pageNumber:any){
    return this.http.get<any>(`${environment.apiUrl}/api/class/teacher-himself?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getTeacherHimselfClasses(){
    return this.http.get<any>(`${environment.apiUrl}/api/class/teacher-himself`).pipe(take(1));
  }

  getClassById(id: any){
    return this.http.get<any>(`${environment.apiUrl}/api/class/${id}`).pipe(take(1));
  }

  getGeneralInfoById(id: any){
    return this.http.get<any>(`${environment.apiUrl}/api/class/${id}/general-info`).pipe(take(1));
  }

  updateClassNameAndStatus(param: any,id: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/class/${id}`,param).pipe(take(1));
  }

  updateStudentStatus(status: boolean,classId: any,studentId: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/class/${classId}/student/${studentId}`,status).pipe(take(1));
  }

  updateTeacherStatus(status: boolean,classId: any,teacherId: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/class/${classId}/teacher/${teacherId}`,status).pipe(take(1));
  }

  addTeacherToClass(teacherId: any,classId: any){
    return this.http.post<any>(`${environment.apiUrl}/api/class/${classId}/teacher/${teacherId}`, {}).pipe(take(1));
  }

  addStudentToClass(studentId: any, classId: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/class/${classId}/student/${studentId}`, {}).pipe(take(1));
  }

  closeClass(classId: number) {
    return this.http.put<any>(`${environment.apiUrl}/api/class/${classId}/close`, {}).pipe(take(1));
  }
}
