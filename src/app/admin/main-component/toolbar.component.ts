import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-component',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  changeLanguageTo(lang: string){
    this.translate.use(lang);
  }

  async logout() {
    await this.auth.logout();
    await this.router.navigate(['/login']);
  }

  bindWithClassroom(){
    this.auth.authWithClassroom().subscribe( url => {
      window.open(url);
    });
  }
}
