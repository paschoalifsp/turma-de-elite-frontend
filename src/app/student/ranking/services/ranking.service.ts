import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  
  constructor(private http: HttpClient) { }
  
  getExternalClassRanking(externalId: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/external/ranking/classes/${externalId}`).pipe(take(1));

  }
  
  getRankedClasses(pageSize: number, pageNumber: number){
    return this.http.get<any>(`${environment.apiUrl}/api/ranking/classes?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getExternalRankedClasses() {
    return this.http.get<any>(`${environment.apiUrl}/api/external/ranking/classes`);
  }

  getClassRanking(classId: number | null) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/ranking/classes/${classId}`).pipe(take(1));
  }
}
