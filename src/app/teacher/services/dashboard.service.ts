import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import postDeliveryActivity, { studentPunctuation } from 'src/app/shared/model/teacherFollowUp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPostDeliveryActivities(): Observable<postDeliveryActivity[]> {
    return this.http.get<postDeliveryActivity[]>(`${environment.apiUrl}/api/teachers/dash`);
  }

  getStudentPunctuations() : Observable<studentPunctuation[]>{
    return this.http.get<studentPunctuation[]>(`${environment.apiUrl}/api/teachers/punctuations`);
  }
}


