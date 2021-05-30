import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  public transform(value: any[], keys: string[], term: string): any[] {
    if (!term) {
      return value;
    }

    return value.filter((item) => {
      return keys.some((key) => {
        return (
          item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])
        );
      });
    });
  }
}
