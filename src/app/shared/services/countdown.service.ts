import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

declare let countdown: any;
declare let moment: any;

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor(private translateService: TranslateService) {
    let currentLang = this.translateService.currentLang;
    if(currentLang === 'pt'){
      countdown.setLabels(
        ' milissegundo| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
        ' milissegundos| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
        ' e ',
        ' , ',
        'agora');
    }

    this.translateService.onLangChange.subscribe(({lang}) => {
      if(lang === 'pt'){
        countdown.setLabels(
          ' milissegundo| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
          ' milissegundos| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
          ' e ',
          ' + ',
          'agora');
      }else {
        countdown.resetLabels();
      }
    })
  }

  countdownTo(date: string){
    return moment().countdown(date,~(countdown.WEEKS | countdown.MILLISECONDS | countdown.SECONDS)).toString();
  }
}
