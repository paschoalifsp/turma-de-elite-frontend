import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalDataService} from "./shared/services/local-data.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../environments/environment";
import {take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private translateService: TranslateService,
    private localDataService: LocalDataService,

    ) {
    translateService.setDefaultLang('pt');
    translateService.addLangs(['en']);
    console.log(translateService.getBrowserLang())
    const lang = localDataService.getConfiguredLang() || translateService.getBrowserLang();
    if(translateService.getLangs().some(appLang => appLang === lang)){
      translateService.use(lang);
    }else{
      translateService.use('pt');
    }

  }

  ngOnInit(): void {

  }
}
