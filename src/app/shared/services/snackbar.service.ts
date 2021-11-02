import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  showSnack(message: string,closeMessage: string) {
    forkJoin(
      this.translateService.get(message),
      this.translateService.get(closeMessage)
    ).subscribe(([translatedMessage,translatedCloseMessage]) => {
      this.snackbar.open(translatedMessage,translatedCloseMessage,{
        duration: 5000,
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition
      });
    })
  }
}
