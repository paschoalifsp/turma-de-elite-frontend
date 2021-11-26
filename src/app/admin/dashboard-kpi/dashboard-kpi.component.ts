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

  monthsInAYear = 12;

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
      hoverBackgroundColor: 'rgb(12, 16, 42)',
    },
    {
      label: 'Inativos',
      data: this.inactiveUsers(),
      backgroundColor: 'rgb(255, 0, 0)',
      hoverBackgroundColor: 'rgb(150, 0, 0)'
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
      hoverBorderColor: 'rgb(48, 63, 159)',
    }
  ];

  constructor(private userService: UsersService, private elementRef: ElementRef) { }

  ngOnInit(): void { 
  }

  months() {
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.userMonth[i] = monthNames[this.users[i].month - 1] + "/" + this.users[i].year;
      }
    });
    return this.userMonth;
  }

  activeUsers() {
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.numberActiveUsers[i] = this.users[i].activeUser;
      }
    });
    return this.numberActiveUsers;
  }

  inactiveUsers() {
    this.userService.getActiveInactiveUsers().subscribe(result => {
      this.users = result;
      for (var i = 0; i <= this.monthsInAYear; i++) {
        this.numberInactiveUsers[i] = this.users[i].inactiveUser;
      }
    });

    return this.numberInactiveUsers;
  }

  usersByMonthAndYear() {
      this.userService.getUsersByAccessionDate().subscribe(result => {
        this.newUsers = result;
        for (var i = 0; i <= this.monthsInAYear; i++) {
          this.numberNewUsers[i] = this.newUsers[i];
        }
      });
    return this.numberNewUsers;
  }
  
}

