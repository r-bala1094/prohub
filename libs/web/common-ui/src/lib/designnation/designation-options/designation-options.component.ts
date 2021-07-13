import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ControlValueAccessorMethods } from '../../control-value-accessor/control-value-accessor';
import { autoCompleteTextFilter } from '@prohub/util';
@Component({
  selector: 'prohub-designation-options',
  templateUrl: './designation-options.component.html',
  styleUrls: ['./designation-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DesignationOptionComponent,
      multi: true,
    },
  ],
})
export class DesignationOptionComponent
  extends ControlValueAccessorMethods
  implements OnInit {
  /******** Tnputs   */
  @Input() lableName?: string = '';
  @Input() keyName?: string = '';
  @Input() dataListSource: Array<{ [key: string]: any }> = [];
  /******** inputs -> end */

  filteredOptions?: Observable<Array<{ [key: string]: any }>>;

  myControl: FormControl = new FormControl();
  controlDesignation?: any;
  constructor() {
    super('controlDesignation', 'myControl', 'dataListSource');
    super.accesorName = this.keyName;
  }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => 
        // console.log(value);
        typeof value === 'object' ? value[this.keyName as string] : value
      ),
      
      map((value) =>
        autoCompleteTextFilter(
          value,
          this.keyName as string,
          this.dataListSource
        )
      )
    );
  }
  public changeEvent(optionSelected: any): void {
    this.controlDesignation = optionSelected;
    this.onChange ? this.onChange(this.controlDesignation) : null;
  }
}
