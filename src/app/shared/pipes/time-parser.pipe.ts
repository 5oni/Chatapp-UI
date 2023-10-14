import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeParser'
})
export class TimeParserPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {

    return value?.split('T')[1]?.substring(0,5);
  }

}
