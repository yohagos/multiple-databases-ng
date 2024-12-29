import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  formatStrings(value: string | undefined) {
    if (value != undefined) {
      let result = value.charAt(0).toUpperCase() + value.substring(1, value.length+1).toLowerCase()
      if (result.includes("_")) {
        result = result.replace("_", " ")
        let index = result.indexOf(" ")
        result = result.substring(0, index) + " " + result.charAt(index + 1).toUpperCase() + result.substring(index + 2, result.length + 1)
      }
      return result
    }
    return '';
  }
}