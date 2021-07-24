import { Component, OnInit } from '@angular/core';
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {AchievementsService} from "../../../../teacher/services/achievements.service";

@Component({
  selector: 'app-achievements-list-page',
  templateUrl: './achievements-list-page.component.html',
  styleUrls: ['./achievements-list-page.component.scss']
})
export class AchievementsListPageComponent implements OnInit {

  achievements: any[] = [];

  constructor(private achievementService: AchievementsService ) { }

  ngOnInit(): void {
    this.achievementService.getStudentAchievements().subscribe( achievements => {
      this.achievements = achievements;
    })
  }

  isDisabled(){
    return Math.random() < 0.5
  }
}
