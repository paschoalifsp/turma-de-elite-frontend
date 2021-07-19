import {Component, OnInit, Output, EventEmitter, SimpleChanges, Input} from '@angular/core';
import {TeacherService} from "../../../teacher/services/teacher.service";
import {MatTableDataSource} from "@angular/material/table";
import {catchError, concatMap, debounceTime, filter, startWith, tap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {ClassService} from "../../services/class.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {of} from "rxjs";

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() teachersChange = new EventEmitter<any>();

  @Input() clear = false;
  @Input() teachers:any[] = [];
  @Input() classId: any;
  @Input() editMode = false;

  teacherColumns = ['name','email','actions']
  teacherDataSource = new MatTableDataSource<any>([]);
  teacherEmail = this.fb.control('');

  teachersOptions: any[] = [];

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
        tap(console.log),
        startWith(''),
        filter(e => e != null && e?.length > 3),
        debounceTime(1000),
        concatMap(e => {
          return this.teacherService.findByEmailSimilarity(e);
        }),
        catchError(e => {
          console.log(e);
          return of([]);
        })
      ).subscribe((teachers: any) => {
      this.teachersOptions = teachers;
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.clear){
      this.teacherEmail.reset();
      this.teacherDataSource.data = this.teachers;
    }else{
      this.teacherEmail.reset();
      this.teacherDataSource.data = this.teachers;

    }
  }

  addTeacher(){
    this.teachersChange.emit([...this.teachers,this.teacherEmail.value]);
    if(this.editMode){
      this.classService.addTeacherToClass(this.teacherEmail.value.id,this.classId).subscribe(success =>{
        this.translateService.get('messages.teacherStatusChangeSuccess').subscribe( translation => {
          this.snackbar.open(translation,'Fechar').afterDismissed();
          this.teacherEmail.reset();
        })
      });
    }
  }

  removeTeacher(teacherId: any){
    this.teachersChange.emit([...this.teachers.filter(t => t.id != teacherId)]);
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
    return this.teachers.length < 1;
  }

  emitNext(){
    this.next.emit();
  }
}
