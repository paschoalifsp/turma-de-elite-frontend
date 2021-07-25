import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentDeliveryService {

  constructor(private http: HttpClient) { }

  deliveryResolution(activityId: number, formDataRequestBody: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/activity-deliveries/activity/${activityId}`,formDataRequestBody).pipe(take(1));
  }

  downloadDeliveryAttachment(activityId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/activity-deliveries/student/activity/${activityId}/download`,
      {responseType: 'blob' as 'json',observe: 'response'}
    ).pipe(take(1));
  }
}
