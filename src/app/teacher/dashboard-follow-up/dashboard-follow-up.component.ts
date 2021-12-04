import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartOptions, ChartType, ChartData, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import postDeliveryActivity, { studentPunctuation } from 'src/app/shared/model/teacherFollowUp';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-follow-up',
  templateUrl: './dashboard-follow-up.component.html',
  styleUrls: ['./dashboard-follow-up.component.scss']
})
export class DashboardFollowUpComponent implements OnInit {

  activities: postDeliveryActivity[] = [];
  studentsPunctuation: studentPunctuation[] = [];
  classesName: string[] = [];
  postActivities: number[] = [];
  deliveryActivities: number[] = [];
  students: string[] = [];
  punctuations: number[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Pontuação'
        },
        ticks: {
          beginAtZero: true
        },
      }]
    },
    legend: {
      position: 'right',
    }
  };
  barChartLabels: Label[] = this.student();
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ 
      label: 'Pontuação', 
      data: this.punctuation(),
      backgroundColor: 'rgb(48, 63, 159)',
      hoverBackgroundColor: 'rgb(12, 16, 42)',
    }
  ];

  barMultiChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Atividades'
        },
        ticks: {
          precision: 0,
          beginAtZero: true
        },
      }]
    },
    legend: {
      position: 'right',
    }
  };
  barMultiChartLabels: Label[] = this.classes();
  barMultiChartType: ChartType = 'bar';
  barMultiChartLegend = true;
  barMultiChartPlugins = [];
  barMultiChartData: ChartDataSets[] = [{ 
      label: 'Postadas', 
      data: this.postActivity(),
      backgroundColor: 'rgb(48, 63, 159)',
      hoverBackgroundColor: 'rgb(12, 16, 42)',
    },
    {
      label: 'Entregues',
      data: this.deliveryActivity(),
      backgroundColor: 'rgb(50, 205, 50)',
      hoverBackgroundColor: 'rgb(22, 90, 22)',
    }
  ];

  constructor(private teacherService: DashboardService, private elementRef: ElementRef) { }

  ngOnInit(): void { 
    
  }

  classes() {
    this.teacherService.getPostDeliveryActivities().subscribe(result => {
      this.activities = result;
      for (var i = 0; i < this.activities.length; i++) {
        this.classesName[i] = this.activities[i].className;
      }
    });

    return this.classesName;
  }

  postActivity() {
    this.teacherService.getPostDeliveryActivities().subscribe(result => {
      this.activities = result;
      for(var i = 0; i < this.activities.length; i++) {
        this.postActivities[i] = this.activities[i].postActivity;
      }
    });

    return this.postActivities;
  }

  deliveryActivity() {
    this.teacherService.getPostDeliveryActivities().subscribe(result => {
      this.activities = result;
      for(var i = 0; i < this.activities.length; i++) {
        this.deliveryActivities[i] = this.activities[i].deliveryActivity;
      }
    });

    return this.deliveryActivities;
  }

  student() {
    this.teacherService.getStudentPunctuations().subscribe(result => {
      this.studentsPunctuation = result;
      for(var i = 0; i < this.studentsPunctuation.length; i++) {
        this.students[i] = this.studentsPunctuation[i].studentName;
      }
    });

    return this.students;
  }

  punctuation() {
    this.teacherService.getStudentPunctuations().subscribe(result => {
      this.studentsPunctuation = result;
      for(var i = 0; i < this.studentsPunctuation.length; i++) {
        this.punctuations[i] = this.studentsPunctuation[i].punctuation;
      }
    });

    return this.punctuations;
  }
}