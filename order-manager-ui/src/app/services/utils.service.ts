import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {

  defaultFormat: string = 'yyyy-MM-dd';
  locale: string = 'en-US';

  convertDate(date: Date): string | null {
    return formatDate(date, this.defaultFormat, this.locale);
  }
}
