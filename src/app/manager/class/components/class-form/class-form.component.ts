import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import School from "../../../../shared/model/school";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../../../../admin/manager/services/manager.service";
import {SchoolService} from "../../../../admin/schools/services/school.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

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

  managerForm = this.fb.group({
    students: [[]],
    teachers: [[]],
    name: ['',Validators.required],
    isActive: [true],
  });

  isLoading = false;

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
          this.managerForm.setValue({email,name,isActive,school});
        });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.managerForm.reset();
    }
    else{
      this.managerService.getManagerById(this.classId as number).subscribe( ({name,email,isActive,school}) => {
        this.managerForm.setValue({name,email,isActive,school})
      })
    }
  }

  updateManager(){
    this.isLoading = true;
    this.managerService.updateManager(this.classId,this.managerForm.value).subscribe(success => {
      this.translateService.get('messages.managerUpdated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    }, error => {
      this.isLoading = false;
    })
  }

  registerManager(){
    this.isLoading = true;
    this.managerService.registerManager(this.managerForm.value).subscribe(success => {
      this.translateService.get('messages.managerCreated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.managerForm.reset();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      this.isLoading = false;
      switch (error.status){
        case 409:
          break;
      }
    });
  }

  displaySchoolName(school: School){
    return school && school.name ? school.name: '';
  }

}
