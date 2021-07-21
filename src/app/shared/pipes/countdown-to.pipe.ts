import { Pipe, PipeTransform } from '@angular/core';
import {CountdownService} from "../services/countdown.service";

@Pipe({
  name: 'countdownTo'
})
export class CountdownToPipe implements PipeTransform {

  constructor(private countdownService: CountdownService) {
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.countdownService.countdownTo(value);
  }

}
