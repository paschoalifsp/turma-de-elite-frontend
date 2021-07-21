import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getTeacherActivities(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/activities?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getStudentActivities() {
    return this.http.get<any>(`${environment.apiUrl}/api/activities/student`).pipe(take(1));
  }

  getTeacherActivityById(activityId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/activities/${activityId}`).pipe(take(1));
  }

  getStudentActivityById(activityId: number,classId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/activities/${activityId}/class/${classId}/student`).pipe(take(1));
  }

  createActivity(activity: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/activities`,activity).pipe(take(1));
  }

  updateActivity(id: any, activity: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/activities/${id}`,activity).pipe(take(1));
  }


  downloadTeacherAttachment(activityId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/activities/${activityId}/download`,
      {responseType: 'blob' as 'json',observe: 'response'}
    ).pipe(take(1));
  }

  downloadStudentAttachment(activityId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/activities/${activityId}/student/download`,
      {responseType: 'blob' as 'json',observe: 'response'}
    ).pipe(take(1));
  }
}
