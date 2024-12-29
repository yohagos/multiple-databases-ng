import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localeDE from "@angular/common/locales/de";
import localeExtra from "@angular/common/locales/extra/de";

@Injectable({
  providedIn: 'root'
})
export class FormatdateService {

  format = 'dd.MM.yyyy'
  formatTimestamp = 'HH:mm:ss, dd.MM.yyyy'
  locale = 'de-DE'

  getFormatedDate(date: string | undefined, withTimestamp?: boolean) {
    if (date) {
      if (withTimestamp) {
        return formatDate(date, this.formatTimestamp, this.locale)
      }
      return formatDate(date, this.format, this.locale)
    }
    return ''
  }

  init() {
    registerLocaleData(localeDE, this.locale, localeExtra)
  }
}
