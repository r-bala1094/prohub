import { OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * here write decorator for cleaning subscritions
 */
export class ComponentFormContorlComponent implements ControlValueAccessor {
  private valueChangesUnsubscribe$?: Subscription;
  constructor(private groupOrControlName: string) {}

  /**
   *
   * handle event of changes function here
   */
  private onChange?: (formValue: any) => void;

  registerOnTouched(fn: any): void {
    console.log;
  }

  writeValue(obj: any): void {
    ((this as any)[this.groupOrControlName as string] as
      | FormControl
      | FormGroup).setValue(obj);
  }
  registerOnChange(fn: any): void {
    // this.valueChangesUnsubscribe$ = ((this as any)[
    //   this.groupOrControlName as string
    // ] as FormControl | FormGroup).valueChanges.subscribe(fn);
  }
  //   registerOnTouched(fn: never): void {

  //   }

  //   setDisabledState(fn: never): void {
  //     console.log(fn);
  //   }

  destroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.valueChangesUnsubscribe$?.unsubscribe();
  }
}
