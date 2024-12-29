import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textfilter',
  standalone: true
})
export class TextfilterPipe implements PipeTransform {
  transform(items: any[] | undefined, searchText: string) {
    if (!items || !searchText) return []
    if (items === undefined) return []
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase())
      })
    })
  }
}
