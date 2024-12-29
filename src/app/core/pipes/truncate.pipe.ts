import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, limit?: number | undefined) {
    const defaultLimit = limit ? limit : 30
    if (!value) return ''
    if (value.length <= defaultLimit) return value
    return value.substring(0, limit) + '...'
  }
}
