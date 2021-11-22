import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {ActivityService} from "../../../activities/services/activity.service";
import {PageEvent} from "@angular/material/paginator";
import {ActivitiesDeliveriesService} from "../../services/activities-deliveries.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-teacher-deliveries-page',
  templateUrl: './teacher-deliveries-page.component.html',
  styleUrls: ['./teacher-deliveries-page.component.scss']
})
export class TeacherDeliveriesPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private activityDelivery: ActivitiesDeliveriesService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.refresh(params['id']);
    })
  }

  panelOpenState = false;

  isLoading = false;
  isChangingPage = false;

  deliveries:any[] = [];

  totalLength = 0;
  pageSize = 5;

  searchControl = new FormControl('');

  activityToggleId: number | null = null;

  createMode = true;

  classes = ['MAT-5A','MAT-6A','MAT-7A','MAT-8A','MAT-9A'];
  colors = ['#FFC600','#BCED09','#8338EC','#FCF300','#FF715B','#B5179E','#FB5607','#B5179E']

  refresh(activityId: number){
    this.activityDelivery.getDeliveriesByActivity(activityId).subscribe(response => {
      this.deliveries = response.map(({percentageReceived,...delivery}) => {
        return {
          gradePercentage: new FormControl(percentageReceived,Validators.required),
          ...delivery
        }
      });
      this.isLoading = false;
    })
  }

  saveGrade(deliveryId: number,grade: number) {
    this.activityDelivery.giveGrade(deliveryId,grade).subscribe( success => {
      this.snackbarService.showSnack('messages.gradeSavedSuccessfully','labels.close');
    });
  }

  downloadDelivery(deliveryId: number) {
    this.activityDelivery.downloadDeliveryById(deliveryId).subscribe( response => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(response.body)
      a.href = objectUrl
      a.download = response.headers.get('filename') || '';
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }
}
