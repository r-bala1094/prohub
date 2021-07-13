import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(value: [], args: string): any[] {
    return value.filter((element : any) =>  args === element.categoryId);
  }

}
