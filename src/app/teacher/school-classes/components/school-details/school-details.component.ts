import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit {

  isEdit = false;

  @Input() classId:number | null = null;
  @Input() createMode = true;

  schoolClass: any;

  @Output() save = new EventEmitter();

  clear = false;

  teachers:any[] = [];
  students:any[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classService: ClassService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.classId !== 0){
      this.classService.getGeneralInfoById(this.classId).subscribe(response => {
        this.schoolClass = response;
      })
    }
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  closeClass(){
    this.classService.closeClass(this.classId as number).subscribe( success => {
      this.snackbarService.showSnack('messages.classClosed','labels.close')
    })
  }

}
