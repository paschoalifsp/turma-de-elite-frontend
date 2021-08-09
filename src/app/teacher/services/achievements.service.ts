import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  constructor(private http: HttpClient) { }

  getAchievements(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/achievements?size=${pageSize}&pageNumber=${pageNumber}`).pipe(take(1));
  }

  getAchievementById(achievementId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/achievements/${achievementId}`).pipe(take(1));
  }

  updateAchievement(achievementId: number | null, achievement: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/achievements/${achievementId}`,achievement).pipe(take(1));
  }

  createAchievement({beforeAt,...rest}: any) {
    const formattedBeforeAt =  beforeAt?.format('YYYY-MM-DD kk:mm:ss');
    return this.http.post<any>(`${environment.apiUrl}/api/achievements`, {beforeAt: formattedBeforeAt,...rest}).pipe(take(1));
  }

  getStudentAchievements() {
    return this.http.get<any>(`${environment.apiUrl}/api/achievements/student`).pipe(take(1));
  }
}
