import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../authentication/services/authentication.service";

@Component({
  selector: 'app-connections-page',
  templateUrl: './connections-page.component.html',
  styleUrls: ['./connections-page.component.scss']
})
export class ConnectionsPageComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  bindWithClassroom(){
    this.auth.authWithClassroom().subscribe( url => {
      window.open(url);
    });
  }
}
