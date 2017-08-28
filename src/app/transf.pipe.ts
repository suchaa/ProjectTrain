import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transf'
})
export class TransfPipe implements PipeTransform {
  
  /* สามารถใช้ได้ทุกที่ของ application */
  transform(value: any, args?: any): any {
    return "**" + value + "**";
  }

}
