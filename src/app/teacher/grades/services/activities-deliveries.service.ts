import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesDeliveriesService {

  constructor(private http: HttpClient) { }

  getDeliveriesByActivity(activityId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/activity-deliveries/teacher/activity/${activityId}`).pipe(take(1));
  }

  giveGrade(deliveryId: number, grade: number) {
    return this.http.post<any>(`${environment.apiUrl}/api/activity-deliveries/${deliveryId}/grade`,grade).pipe(take(1));
  }

  downloadDeliveryById(deliveryId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/activity-deliveries/${deliveryId}/download`,{responseType: 'blob' as 'json',observe: 'response'}).pipe(take(1));
  }
}
