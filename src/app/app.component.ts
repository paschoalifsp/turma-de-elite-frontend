import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalDataService} from "./shared/services/local-data.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../environments/environment";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
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
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
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
    this.firebaseAuth.user.subscribe(user => {
      if(user!=null){
        this.getRole().subscribe( role => this.redirectAccordingToRole(role));
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

  private redirectAccordingToRole(role: string){
    switch (role){
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'STUDENT':
        break;
      case 'TEACHER':
        this.router.navigate(['/teacher/dashboard']);
        break;
      case 'MANAGER':
        this.router.navigate(['/manager/dashboard']);
        break;

    }
  }

  getRole(){
    return this.http.get<string>(`${environment.apiUrl}/api/roles`,{responseType: 'text' as 'json'})
      .pipe(take(1));
  }
}
