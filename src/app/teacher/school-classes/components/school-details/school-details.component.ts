import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClassService} from "../../../../manager/school-classes/services/class.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {TierConfigService} from "../../services/tier-config.service";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit {

  isEdit = false;

  @Input() classId:number | null = null;
  @Input() createMode = true;
  @Input() isFromLms: any = null;

  schoolClass: any;

  @Output() save = new EventEmitter();

  clear = false;

  teachers:any[] = [];
  students:any[] = [];

  isLoading = false;

  tierConfigForm = this.fb.group({
    goldPercent: [
      '',
      Validators.compose([
        Validators.min(1),
        Validators.max(98),
        Validators.required
      ])
    ],
    silverPercent: [
      '',
      Validators.compose([
        Validators.min(1),
        Validators.max(98),
        Validators.required
      ])
    ],
    bronzePercent: [
      '',
      Validators.compose([
        Validators.min(1),
        Validators.max(98),
        Validators.required
      ])
    ],
  },{ validators: control => {
      const bronzePercent = control.get('bronzePercent')?.value as number;
      const silverPercent = control.get('silverPercent')?.value as number;
      const goldPercent = control.get('goldPercent')?.value as number;

      if((bronzePercent + silverPercent + goldPercent) != 100){
        return {invalidValues: true};
      }else{
        return null;
      }
    }
  })
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classService: ClassService,
    private tierConfigService: TierConfigService,
    private snackbarService: SnackbarService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.classId !== 0){
      this.classService.getGeneralInfoById(this.classId).subscribe(response => {
        this.schoolClass = response;
        this.tierConfigForm.setValue(response?.tierConfig);
      })
    }
  }

  createTierConfig(){
    this.tierConfigService.createTierConfig(this.tierConfigForm.value,this.classId).subscribe( response => {
      this.snackbar.showSnack('messages.tierConfigSavedSuccessfully','labels.close');
    }, error => {
      this.snackbar.showSnack('fieldErrors.undefinedError','labels.close');
    })
  }

  updateTierConfig(){
    this.tierConfigService.updateTierConfig(this.tierConfigForm.value,this.classId).subscribe( response => {
      this.snackbar.showSnack('messages.tierConfigUpdatedSuccessfully','labels.close');
    }, error => {
      this.snackbar.showSnack('fieldErrors.undefinedError','labels.close');
    })
  }

  displayName(teacher: any){
    return teacher && teacher.name ? teacher.name: '';
  }

  closeClass(){
    this.classService.closeClass(this.classId as number).subscribe( success => {
      this.snackbarService.showSnack('messages.classClosed','labels.close')
    })
  }

}
