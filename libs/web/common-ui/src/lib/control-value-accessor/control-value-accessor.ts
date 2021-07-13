import { ControlValueAccessor, FormControl } from '@angular/forms';

export class ControlValueAccessorMethods implements ControlValueAccessor {
  protected accesorName: string | undefined;
  private viewFromControlToBeBind = '';
  private listObjectName = '';
  private selRef: ControlValueAccessorMethods;
  public keyName?: string;
  constructor(
    accesorName: string,
    viewFromControlToBeBind: string,
    listObjectName: string
  ) {
    this.accesorName = accesorName;
    this.viewFromControlToBeBind = viewFromControlToBeBind;
    this.listObjectName = listObjectName;
    this.selRef = this;
  }
  protected onChange?: (value: string) => void | undefined;

  writeValue(id: number | string): void {
    this.getRef[this.accesorName as string] = id;
    this.updateChanges(id);
  }
  registerOnChange(fn: never): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: never): void {
    console.log(fn);
  }

  setDisabledState(fn: never): void {
    console.log(fn);
  }

  private updateChanges(id:any): void {
    if (
      !this.viewFromControlToBeBind ||
      !this.getRef[this.accesorName as string]
    ) {
      return;
    }

    /** write view updating stuff */

    (this.getRef[this.viewFromControlToBeBind] as FormControl).setValue(
      (this.findObject(id) || {})[this.keyName as string]
    );
  }

  /********
   * find object by id
   */
  private findObject(id: number): { [key: string]: string | number } {
    return (this.getRef[this.listObjectName] || []).find(
      (accu: { name: string; id: number }) => accu.id === id
    );
  }

  private get getRef(): any {
    return this.selRef;
  }
}
