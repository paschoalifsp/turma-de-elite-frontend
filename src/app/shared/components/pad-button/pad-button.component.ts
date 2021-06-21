import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pad-button',
  templateUrl: './pad-button.component.html',
  styleUrls: ['./pad-button.component.scss']
})
export class PadButtonComponent implements OnInit {

  @Input() label!: string;
  @Output() click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
