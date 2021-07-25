import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  getRankedClasses(pageSize: number, pageNumber: number){
    return this.http.get<any>(`${environment.apiUrl}/api/ranking/classes?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getClassRanking(classId: number | null) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/ranking/classes/${classId}`).pipe(take(1));
  }
}
