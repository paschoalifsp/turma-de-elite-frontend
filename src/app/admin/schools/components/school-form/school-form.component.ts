import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../services/school.service";
import {EventEmitter} from '@angular/core';
import {transition} from "@angular/animations";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {

  isEdit = false;
  alreadyRegisteredIdentifier = false;

  @Input() schoolId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();


  schoolForm = this.fb.group({
    name: ['', [Validators.required]],
    identifier: ['',[Validators.required]],
    isActive: ['']
  });

  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver

  ) { }

  ngOnInit(): void {
    if(this.schoolId){
      this.isEdit = true;
    }
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.schoolForm.reset();
    }
    else{
      this.schoolService.getSchoolById(this.schoolId as number).subscribe( ({name,identifier,isActive}) => {
        this.schoolForm.setValue({name,identifier,isActive})

      })
    }

  }

  updateSchool(){
    this.isLoading = true;
    this.schoolService.updateSchool(this.schoolId as number,this.schoolForm.value).subscribe(success => {
      this.translateService.get('messages.schoolUpdated').subscribe( translation => {
        this.isLoading = false;
        this.snackbar.open(translation,'Fechar');
        this.save.emit();
      })
    }, error => {
      console.log(error);
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.alreadyRegisteredIdentifier = true;
          this.translateService.get('messages.alreadyRegisteredIdentifier').subscribe(translation => {
            this.snackbar.open(translation, 'Fechar');
          })
          break;
      }
    });
  }

  createSchool(){
    this.isLoading = true;
    this.schoolService.createSchool(this.schoolForm.value).subscribe(success => {
      this.translateService.get('messages.schoolCreated').subscribe( translation => {
        this.isLoading = false;
        this.snackbar.open(translation,'Fechar');
        this.save.emit();
      })
    }, error => {
      console.log(error);
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.translateService.get('messages.alreadyRegisteredIdentifier').subscribe(translation => {
            this.snackbar.open(translation, 'Fechar');
          })
          this.alreadyRegisteredIdentifier = true;
          break;
      }
    });
  }

  closeForm(){
    this.cancel.emit();
  }

  showSnackbar(message: string){
    return this.snackbar.open(message,'Fechar');
  }

}
