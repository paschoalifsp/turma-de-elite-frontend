import {Component, OnInit, Output, EventEmitter, SimpleChanges, Input} from '@angular/core';
import {TeacherService} from "../../../teacher/services/teacher.service";
import {MatTableDataSource} from "@angular/material/table";
import {concatMap, debounceTime, filter} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {ClassService} from "../../services/class.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() teachers = new EventEmitter<any>();

  @Input() clear = false;
  @Input() setTeachers:any[] = [];
  @Input() classId: any;

  teacherColumns = ['name','email','actions']
  teacherDataSource = new MatTableDataSource<any>([]);
  teacherEmail = this.fb.control('');

  teachersOptions: any[] = [];
  _teachers:any[] = []

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.teacherEmail
      .valueChanges
      .pipe(
        filter(e => e.length > 3),
        debounceTime(1000),
        concatMap(e => {
          console.log(e);
          return this.teacherService.findByEmailSimilarity(e);
        })
      ).subscribe(teachers => {
      this.teachersOptions = teachers;
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.clear){
      this._teachers = [];
      this.teacherEmail.reset();
      this.teacherDataSource.data = this._teachers;
    }else{
      this._teachers.push(...this.setTeachers);
      this.teacherEmail.reset();
      console.log(this._teachers)
      this.teacherDataSource.data = this._teachers;
    }
  }


  addTeacher(){
    this._teachers.push(this.teacherEmail.value);
    this.teacherEmail.reset();
    this.teacherDataSource.data = this._teachers;
    this.teachers.emit(this._teachers);
  }

  removeTeacher(teacherId: any){
    this._teachers = [...this._teachers.filter(t => t.id != teacherId)]
    this.teacherDataSource.data = this._teachers;
    this.teachers.emit(this._teachers);
  }

  changeStatus(status: boolean,teacherId: any){
    this.classService.updateTeacherStatus(status,this.classId,teacherId).subscribe(success => {
      this.translateService.get('messages.teacherStatusChangeSuccess').subscribe( translation => {
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    },error => {
      this.translateService.get('error.teacherStatusChangeError').subscribe( translation => {
        this.snackbar.open(translation,'Atualizar página').afterDismissed().subscribe(() =>{

        });
      })
    });
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  isInvalid() {
    return this._teachers.length < 1;
  }

  emitNext(){
    this.next.emit();
  }
}
