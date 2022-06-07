import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNames'
})
export class ShortNamesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let arrNames: string[] = value.split(' ');
    if(arrNames.length > 2) {
      return `${arrNames[0]} ${arrNames[2]}`
    } else {
      return value
    }
  }

}
