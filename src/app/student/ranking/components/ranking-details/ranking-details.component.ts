import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RankingService} from "../../services/ranking.service";

@Component({
  selector: 'app-ranking-details',
  templateUrl: './ranking-details.component.html',
  styleUrls: ['./ranking-details.component.scss']
})
export class RankingDetailsComponent implements OnInit {

  isEdit = false;

  @Input() classId:number | null = null;
  @Input() externalId: string | null = null;

  @Input() createMode = true;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  students: any[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rankingService: RankingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.classId = value['id'];

      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.classId){
      this.rankingService.getClassRanking(this.classId).subscribe(response => {
        this.students = response;
      })
    }
    if(this.externalId){
      this.rankingService.getExternalClassRanking(this.externalId).subscribe(response => {
        this.students = response;
      })
    }
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  getTier(tier: any) {
    if(tier=== 'BRONZE'){
      return 'bronze';
    } else if(tier==='SILVER'){
      return 'silver';
    } else {
      return 'gold';
    }
  }
  closeForm(){
    this.cancel.emit();
  }
}
