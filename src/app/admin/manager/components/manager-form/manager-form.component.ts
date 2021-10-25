import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../users/services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {ManagerService} from "../../services/manager.service";
import School from "../../../../shared/model/school";
import {Observable, of} from "rxjs";
import {SchoolService} from "../../../schools/services/school.service";
import {concatMap, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.scss']
})
export class ManagerFormComponent implements OnInit {

  isEdit = false;

  @Input() managerId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  alreadyRegisteredEmail = false;

  managerForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    school: ['',Validators.required],
    isActive:['']
  });

  filteredSchools$ = of([] as School[]);

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
    this.managerForm.get('school')?.valueChanges.subscribe(value => {
      if(!value?.id){
        this.filteredSchools$ = this.schoolService.findSchoolByNameSimilarity(value);
      }
    })
    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.managerId = value['id'];
        this.managerService.getManagerById(this.managerId as number).subscribe(({email,name,isActive,school})=>{
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
      this.managerService.getManagerById(this.managerId as number).subscribe( ({name,email,isActive,school}) => {
        this.managerForm.setValue({name,email,isActive,school})
      })
    }
  }

  updateManager(){
    this.isLoading = true;
    this.managerService.updateManager(this.managerId,this.managerForm.value).subscribe(success => {
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
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

  displaySchoolName(school: School){
    return school && school.name ? school.name: '';
  }

  closeForm(){
    this.cancel.emit();
  }

}
