import { Component, OnInit, ElementRef } from '@angular/core';
import { UsersService } from "../users/services/users.service"; 
import { ChartOptions, ChartType, ChartData, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import activeInactiveUser from "../../shared/model/activeInactiveUser";
 
@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.component.html',
  styleUrls: ['./dashboard-kpi.component.scss']
})
export class DashboardKpiComponent implements OnInit {

  users: activeInactiveUser[] = [];
  newUsers: number[] = [];
  numberNewUsers: number[] = [];
  userMonth: string[] = [];
  numberActiveUsers: number[] = [];
  numberInactiveUsers: number[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Usuários'
        },
        ticks: {
          precision: 0,
        }
      }]
    },
    legend: {
      position: 'right',
    }
  };
  barChartLabels: Label[] = this.months();
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ 
      label: 'Ativos', 
      data: this.activeUsers(),
      backgroundColor: 'rgb(48, 63, 159)',
    },
    {
      label: 'Inativos',
      data: this.inactiveUsers(),
      backgroundColor: 'rgb(255, 0, 0)',
    }
  ];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Usuários',
        },
        ticks: {
          precision: 0,
        }
      }]
    },
    legend: {
      position: 'right',
    }
  };
  lineChartLabels: Label[] = this.months();
  lineChartType: ChartType = 'line';
  lineChartData: ChartDataSets[] = [{ 
      label: 'Novos', 
      data: this.usersByMonthAndYear(),
      fill: false,
      borderColor: 'rgb(48, 63, 159)',
      pointBackgroundColor: 'rgb(48, 63, 159)',
    }
  ];

  constructor(private userService: UsersService, private elementRef: ElementRef) { }

  ngOnInit(): void { 
    
  }

  months() {
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i < 13; i++) {
        switch(this.users[i].month) {
          case 1:
            this.userMonth[i] = "Jan/" + this.users[i].year;
            break;
          case 2:
            this.userMonth[i] = "Fev/" + this.users[i].year;
            break;
          case 3:
            this.userMonth[i] = "Mar/" + this.users[i].year;
            break;
          case 4:
            this.userMonth[i] = "Abr/" + this.users[i].year;
            break;
          case 5:
            this.userMonth[i] = "Mai/" + this.users[i].year;
            break;
          case 6:
            this.userMonth[i] = "Jun/" + this.users[i].year;
            break;
          case 7:
            this.userMonth[i] = "Jul/" + this.users[i].year;
            break;
          case 8:
            this.userMonth[i] = "Ago/" + this.users[i].year;
            break;
          case 9:
            this.userMonth[i] = "Set/" + this.users[i].year;
            break;
          case 10:
            this.userMonth[i] = "Out/" + this.users[i].year;
            break;
          case 11:
            this.userMonth[i] = "Nov/" + this.users[i].year;
            break;
          case 12:
            this.userMonth[i] = "Dez/" + this.users[i].year;
            break;
          default:
            break;
        }
      }
    });
    return this.userMonth;
  }

  activeUsers() {
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i < 13; i++) {
        this.numberActiveUsers[i] = this.users[i].activeUser;
      }
    });
    return this.numberActiveUsers;
  }

  inactiveUsers() {
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i < 13; i++) {
        this.numberInactiveUsers[i] = this.users[i].inactiveUser;
      }
    });

    return this.numberInactiveUsers;
  }

  usersByMonthAndYear() {
      this.userService.getUsersByAccessionDate().subscribe(result => {
        this.newUsers = result;
        for (var i = 0; i < 13; i++) {
          this.numberNewUsers[i] = this.newUsers[i];
        }
      });
    return this.numberNewUsers;
  }
  
}

