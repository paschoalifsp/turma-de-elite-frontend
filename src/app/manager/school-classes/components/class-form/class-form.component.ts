import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  isEdit = false;

  @Input() classId:number | string | null = null;
  @Input() createMode = true;
  @Input() isFromLms: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  clear = false;

  teachers:any[] = [];
  students:any[] = [];
  classNameControl = this.fb.control('',Validators.required);
  isActiveControl = this.fb.control('',Validators.required);

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classService: ClassService,
    private translateService: TranslateService,
    private snackbar: MatSnackBar
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
    if(this.createMode){
      this.teachers = [];
      this.students = [];
      this.classNameControl.reset();
      this.clear = true;
      setTimeout(() => {
        this.clear = false;
      },500)
    }
    else{
      if(this.isFromLms === true){
        this.classService.getExternalClassById(this.classId).subscribe(response => {
          this.teachers = response.teachers.map((t:any) => ({isActive: t.isActive,name: t.teacher.name,email: t.teacher.email,id:t.teacher.id}));
          this.students = response.students.map((s:any) => ({isActive: s.isActive,name: s.student.name,registry: s.student.registry,id:s.student.id}));
          this.classNameControl.setValue(response.name);
          this.isActiveControl.setValue(response.isActive);
        })
      } else if (this.isFromLms === false || this.isFromLms === null) {
        this.classService.getClassById(this.classId).subscribe(response => {
          this.teachers = response.teachers.map((t:any) => ({isActive: t.isActive,name: t.teacher.name,email: t.teacher.email,id:t.teacher.id}));
          this.students = response.students.map((s:any) => ({isActive: s.isActive,name: s.student.name,registry: s.student.registry,id:s.student.id}));
          this.classNameControl.setValue(response.name);
          this.isActiveControl.setValue(response.isActive);
        })
      }
    }
  }

  createClass(){
    this.isLoading = true;
    const teachersId = this.teachers.map(teacher => teacher.id);
    const studentsId = this.students.map(student => student.id);
    this.classService.createClass({
      teachersId,
      studentsId,
      className: this.classNameControl.value,
      isActive: this.isActiveControl.value
    }).subscribe( success => {
      this.translateService.get('messages.classCreated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
        this.isLoading = false;
      })
    }, error => {
      this.isLoading = false;
    })
  }

  updateStatusAndName(){
    this.isLoading = true;
    this.classService.updateClassNameAndStatus({name: this.classNameControl.value,isActive: this.isActiveControl.value},this.classId).subscribe(success => {
      this.translateService.get('messages.classNameAndStatusUpdated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    }, error => {
      this.isLoading = false;
    })
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  get teachersCompleted(){
    return this.teachers.length > 0;
  }

  get studentsCompleted(){
    return this.students.length > 0;
  }

  closeForm(){
    this.cancel.emit();
  }
}
