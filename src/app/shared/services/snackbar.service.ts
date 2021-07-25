import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  showSnack(message: string,closeMessage: string) {
    forkJoin(
      this.translateService.get(message),
      this.translateService.get(closeMessage)
    ).subscribe(([translatedMessage,translatedCloseMessage]) => {
      this.snackbar.open(translatedMessage,translatedCloseMessage,{duration: 5000});
    })
  }
}
