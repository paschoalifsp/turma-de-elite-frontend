import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  isEdit = false;

  @Input() classId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();

  teacherEmail = this.fb.control('');
  studentRegistry = this.fb.control('');

  teachers = [
    {id: 1, name: 'Professor genérico 1',email: 'professor.generico1@gmail.com'},
    {id: 2, name: 'Professor genérico 2',email: 'professor.generico2@gmail.com'},
    {id: 3, name: 'Professor genérico 3',email: 'professor.generico3@gmail.com'},
    {id: 4, name: 'Professor genérico 4',email: 'professor.generico4@gmail.com'}
  ]

  students = [
    {id: 1, name: "Aluninho show de bola 1", registry: '15436'},
    {id: 2, name: "Aluninho show de bola 2",registry: '15438'},
    {id: 3, name: "Aluninho show de bola 3",registry: '15439'},
    {id: 4, name: "Aluninho show de bola 4",registry: '15432'},
    {id: 5, name: "Aluninho show de bola 5",registry: '15433'},
  ]

  isLoading = false;

  studentDataSource = new MatTableDataSource<any>([]);
  studentColumns = ['name','registry','actions']

  teacherDataSource = new MatTableDataSource<any>([]);
  teacherColumns = ['name','email','actions']

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private managerService: ManagerService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.classId = value['id'];
        this.managerService.getManagerById(this.classId as number).subscribe(({email,name,isActive,school})=>{

        });
      }
    })
    this.studentDataSource.data = this.students;
    this.teacherDataSource.data = this.teachers;
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      // this.managerForm.reset();
    }
    else{
      this.managerService.getManagerById(this.classId as number).subscribe( ({name,email,isActive,school}) => {
        // this.managerForm.setValue({name,email,isActive,school})
      })
    }
  }

  updateManager(){
    // this.isLoading = true;
    // this.managerService.updateManager(this.classId,this.managerForm.value).subscribe(success => {
    //   this.translateService.get('messages.managerUpdated').subscribe( translation => {
    //     this.isLoading = false;
    //     this.save.emit();
    //     this.snackbar.open(translation,'Fechar').afterDismissed();
    //   })
    // }, error => {
    //   this.isLoading = false;
    // })
  }

  registerManager(){
    // this.isLoading = true;
    // this.managerService.registerManager(this.managerForm.value).subscribe(success => {
    //   this.translateService.get('messages.managerCreated').subscribe( translation => {
    //     this.isLoading = false;
    //     this.save.emit();
    //     this.managerForm.reset();
    //     this.snackbar.open(translation,'Fechar');
    //   })
    // }, error => {
    //   this.isLoading = false;
    //   switch (error.status){
    //     case 409:
    //       break;
    //   }
    // });
  }

  displaySchoolName(school: School){
    return school && school.name ? school.name: '';
  }

}
