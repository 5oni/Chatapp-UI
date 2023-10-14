import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateParser'
})
export class DateParserPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let msgDate = new Date(value)
    let today = new Date()
    if (this.compareToday(today, msgDate)) {
      return "Today";
    }
    if (this.compareYesterday(today, msgDate)) {
      return "Yesterday";
    }
    return this.formatDate(msgDate);
  }

  compareToday(a: any, b: any) {
    return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear()
  }
  compareYesterday(a: any, b: any) {
    return (a.getDate() - 1) == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear()
  }
  formatDate(a: any) {
    return a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear()
  }

}
