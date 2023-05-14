import {Directive} from '@angular/core';
import * as moment from "moment/moment";

@Directive({
  selector: '[appDateParser]'
})
export class DateParserDirective {

  static getStrDate(date: Date): string {
    return moment(date).format('DD.MM.yyyy')
  }

  static getDate(date: string, format: string | null = null): Date {
    return format == null ? moment(date, 'DD.MM.yyyy').toDate() : moment(date, format).toDate()
  }

}
