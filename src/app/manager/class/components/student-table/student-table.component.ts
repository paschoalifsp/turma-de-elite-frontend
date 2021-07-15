import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TeacherService} from "../../../teacher/services/teacher.service";
import {FormBuilder} from "@angular/forms";
import {concatMap, debounceTime, filter} from "rxjs/operators";
import {StudentsService} from "../../../students/services/students.service";
import {ClassService} from "../../services/class.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() students = new EventEmitter<any>();

  @Input() clear = false;
  @Input() setStudents:any[] = [];
  @Input() classId: any;

  studentColumns = ['name','email','actions']
  studentDataSource = new MatTableDataSource<any>([]);

  studentRegistryControl = this.fb.control('');
  studentOptions: any[] = [];
  _students:any[] = []

  constructor(
    private studentsService: StudentsService,
    private fb: FormBuilder,
    private classService: ClassService,
    private translateService: TranslateService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.studentRegistryControl
      .valueChanges
      .pipe(
        filter(e => e.length > 3),
        debounceTime(1000),
        concatMap(e => {
          return this.studentsService.findByRegistrySimilarity(e);
        })
      ).subscribe(teachers => {
      this.studentOptions = teachers;
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.clear){
      this._students = [];
      this.studentRegistryControl.reset();
      this.studentDataSource.data = this._students;
    }else{
      this._students.push(...this.setStudents);
      this.studentRegistryControl.reset();
      this.studentDataSource.data = this._students;
    }
  }


  addTeacher(){
    this._students.push(this.studentRegistryControl.value);
    this.studentRegistryControl.reset();
    this.studentDataSource.data = this._students;
    this.students.emit(this._students);
  }

  removeStudent(teacherId: any){
    this._students = [...this._students.filter(t => t.id != teacherId)]
    this.studentDataSource.data = this._students;
    this.students.emit(this._students);
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  isInvalid() {
    return this._students.length < 1;
  }

  emitNext(){
    this.next.emit();
  }

  emitPrevious() {
    this.previous.emit();
  }

  changeStatus(status: boolean, studentId:any) {
    this.classService.updateStudentStatus(status,this.classId,studentId).subscribe(success => {
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
}
