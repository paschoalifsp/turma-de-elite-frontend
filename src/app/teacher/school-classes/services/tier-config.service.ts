import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TierConfigService {
  constructor(private http: HttpClient) { }
  
  createOrUpdateExternalTierConfig(value: any, classId: string | null) {
    return this.http.post(`${environment.apiUrl}/api/external/courses/${classId}/tier-config`,value)
  }

  createTierConfig(tierConfig: any, classId: any){
    return this.http.post(`${environment.apiUrl}/api/class/${classId}/tier-config`, tierConfig);
  }

  updateTierConfig(tierConfig: any, classId: any){
    return this.http.put(`${environment.apiUrl}/api/class/${classId}/tier-config`, tierConfig);
  }
}
