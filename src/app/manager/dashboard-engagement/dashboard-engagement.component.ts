import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import activeInactiveUser from 'src/app/shared/model/activeInactiveUser';
import activityByTeacher from 'src/app/shared/model/activityByTeacher';
import { StudentsService } from "../students/services/students.service"; 
import { TeacherService } from '../teacher/services/teacher.service';

@Component({
  selector: 'app-dashboard-engagement',
  templateUrl: './dashboard-engagement.component.html',
  styleUrls: ['./dashboard-engagement.component.scss']
})
export class DashboardEngagementComponent implements OnInit {

  activitiesByTeacher: activityByTeacher[] = [];
  nameTeachers: string[] = []
  numberActivities: number[] = [];

  students: activeInactiveUser[] = [];
  studentMonth: string[] = [];
  numberActiveStudents: number[] = [];
  numberInactiveStudents: number[] = [];

  monthsInAYear = 12;

  barMultiChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Alunos'
        },
        ticks: {
          precision: 0,
          beginAtZero: true
        }
      }]
    },
    legend: {
      position: 'right',
    }
  };
  barMultiChartLabels: Label[] = this.months();
  barMultiChartType: ChartType = 'bar';
  barMultiChartLegend = true;
  barMultiChartPlugins = [];
  barMultiChartData: ChartDataSets[] = [{ 
      label: 'Ativos', 
      data: this.activeStudents(),
      backgroundColor: 'rgb(48, 63, 159)',
      hoverBackgroundColor: 'rgb(12, 16, 42)',
    },
    {
      label: 'Inativos',
      data: this.inactiveStudents(),
      backgroundColor: 'rgb(255, 0, 0)',
      hoverBackgroundColor: 'rgb(150, 0, 0)'
    }
  ];

  barChartOptions: ChartOptions = {
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
        }
      }]
    },
    legend: {
      position: 'right',
    }
  };
  barChartLabels: Label[] = this.teachers();
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ 
      label: 'Postadas', 
      data: this.activies(),
      backgroundColor: 'rgb(48, 63, 159)',
      hoverBackgroundColor: 'rgb(12, 16, 42)',
    }
  ];

  constructor(private studentsService: StudentsService, private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  months() {
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    this.studentsService.getActiveInactiveStudents().subscribe(result => {
      this.students = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.studentMonth[i] = monthNames[this.students[i].month - 1] + "/" + this.students[i].year;
      }
    });
    return this.studentMonth;
  }

  
  activeStudents() {
    this.studentsService.getActiveInactiveStudents().subscribe(result => {
      this.students = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.numberActiveStudents[i] = this.students[i].activeUser;
      }
    });
    return this.numberActiveStudents;
  }

  inactiveStudents() {
    this.studentsService.getActiveInactiveStudents().subscribe(result => {
      this.students = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.numberInactiveStudents[i] = this.students[i].inactiveUser;
      }
    });

    return this.numberInactiveStudents;
  }

  teachers() {
    this.teacherService.getActivitiesByTeacher().subscribe(result => {
      this.activitiesByTeacher = result;
      for (var i = 0; i < this.activitiesByTeacher.length; i++) {
        this.nameTeachers[i] = this.activitiesByTeacher[i].teacher;
      }
    });

    return this.nameTeachers;
  }

  activies() {
    this.teacherService.getActivitiesByTeacher().subscribe(result => {
      this.activitiesByTeacher = result;
      for (var i = 0; i < this.activitiesByTeacher.length; i++) {
        this.numberActivities[i] = this.activitiesByTeacher[i].activity;
      }
    });

    return this.numberActivities;
  }

}
