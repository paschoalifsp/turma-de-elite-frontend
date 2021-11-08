import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isEdit = false;

  @Input() userId:number | null = null;
  @Input() createMode = true;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  alreadyRegisteredEmail = false;

  userForm = this.fb.group({
    email: ['',Validators.email],
    name: ['',Validators.required],
    isActive:['']
  });

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    
    this.userForm.get('isActive')?.valueChanges.subscribe (value => {
      console.log(value);
    })

    this.route.params.subscribe(value => {
      if(value['id']){
        this.isEdit = true;
        this.userId = value['id'];
        this.userService.findUserById(this.userId).subscribe(({email,name})=>{
          this.userForm.setValue({email,name});
        });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.isEdit = !this.createMode;
    if(this.createMode){
      this.userForm.reset();
    }
    else{
      this.userService.findUserById(this.userId as number).subscribe( ({name,email,isActive}) => {
        this.userForm.setValue({name,email,isActive})
      })
    }

  }

  updateUser(){
    this.isLoading = true;
    this.userService.updateUser(this.userId,this.userForm.value).subscribe(success => {
      this.translateService.get('messages.userUpdated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar').afterDismissed();
      })
    })
  }

  createUser(){
    this.isLoading = true;
    this.userService.createNewUser(this.userForm.value).subscribe(success => {
      this.translateService.get('messages.userCreated').subscribe( translation => {
        this.isLoading = false;
        this.save.emit();
        this.snackbar.open(translation,'Fechar');
      })
    }, error => {
      console.log(error);
      this.isLoading = false;
      switch (error.status){
        case 409:
          this.translateService.get('messages.alreadyRegisteredEmail').subscribe(translation => {
            this.snackbar.open(translation, 'Fechar');
          })
          this.alreadyRegisteredEmail = true;
          break;
      }
    });
  }

  closeForm(){
    this.cancel.emit();
  }


}
