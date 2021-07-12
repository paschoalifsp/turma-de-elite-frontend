import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'navigator-button',
  templateUrl: './dashboard-navigator-button.component.html',
  styleUrls: ['./dashboard-navigator-button.component.scss']
})
export class DashboardNavigatorButtonComponent implements OnInit {

  @Input() path = '';
  @Input() label = '';
  @Input() iconName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
