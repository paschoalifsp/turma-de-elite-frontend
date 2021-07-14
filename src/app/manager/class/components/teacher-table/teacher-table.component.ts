import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {TeacherService} from "../../../teacher/services/teacher.service";
import {MatTableDataSource} from "@angular/material/table";
import {concatMap, debounceTime, filter} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() teachers = new EventEmitter<any>();

  teacherColumns = ['name','email','actions']
  teacherDataSource = new MatTableDataSource<any>([]);
  teacherEmail = this.fb.control('');

  teachersOptions: any[] = [];
  _teachers:any[] = []

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder,
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
