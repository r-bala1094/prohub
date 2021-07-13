import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { WebCommonService } from 'apps/web/website/src/app/services/web-common.service';
import { ClientProfileService } from '../../../../services/client-profile.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'prohub-objects-edit',
  templateUrl: './objects-edit.component.html',
  styleUrls: ['./objects-edit.component.scss']
})
export class ObjectsEditComponent implements OnInit {

  objectivesInfo : FormGroup;
  objectives = [];
  objectivesResponse = [];
  selectedObjectivesResponse = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterObjectives: Observable<string[]>;
  @Input('details') details;
  @Output() toggleEditMode = new EventEmitter<any>();
  @ViewChild('ObjectiveInputCtrl') ObjectiveInputCtrl: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private commonService: WebCommonService,
    private clientService: ClientProfileService
  ) {
    this.objectivesInfo = this.fb.group({
      objectivesChipList: [''],
      objectiveInput: ['']
    });
  }

  ngOnInit(): void {
    this.getObjectivesList();
  }

  getObjectivesList() {
    this.commonService.getCategoriesList('', null).subscribe((res: any) => {
      this.objectives = [];
      this.objectivesResponse = [];
      if (res.response && res.response.data) {
        this.objectivesResponse = res.response.data;
        this.objectivesResponse.forEach(value => {
          this.objectives.push(value.category);
        });
        this.filterObjectives = this.objectivesInfo.controls['objectiveInput'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.objectives))
        );
      }
    });
  }

  removeObjective(objective) {
    const index = this.objectivesChipList.value.indexOf(objective);
    if (index >= 0) {
      this.objectivesChipList.value.splice(index, 1);
    }
    this.objectivesInfo.patchValue({
      objectivesChipList: [...this.objectivesChipList.value],
      objectiveInput: ''
    });
    this.selectedObjectivesResponse.splice(
      this.selectedObjectivesResponse.findIndex(data => data.category === objective), 1
    );
  }

  selectedObjective(event: MatAutocompleteSelectedEvent): void {
    let index = this.objectivesChipList.value.indexOf(event.option.viewValue);
    if(index == -1){
      this.objectivesInfo.patchValue({
        objectivesChipList: [...this.objectivesChipList.value, event.option.value],
        objectiveInput: ''
      });
    }
    this.objectivesInfo.controls['objectiveInput'].setValue('');
    this.ObjectiveInputCtrl.nativeElement.value = '';
    this.selectedObjectivesResponse.push(
      ...this.objectivesResponse.filter(data => data.category === event.option.value)
    );
  }

  ngOnChanges() {
    if (this.details) {
      this.setData();
    }
  }

  setData() {
    this.selectedObjectivesResponse = this.details;
    const selectedObjectives = [];
    this.details.forEach(detail => {
      selectedObjectives.push(detail.category);
    });
    this.objectivesInfo.patchValue({
      objectivesChipList: [...selectedObjectives],
      objectiveInput: ''
    });
  }

  get objectivesChipList() {
    return this.objectivesInfo.get('objectivesChipList');
  }

  onUpdateClick() {
    this.clientService.putObjectives({objectives: this.selectedObjectivesResponse}).subscribe((res:any) => {
      this.toggleEditMode.emit();   
    },(err: any)=> {
      console.log(err);
    });
  }

  onCancelClick() {
    this.toggleEditMode.emit();
  }

  private _filter(value, arrayToFilter): string[] {
    const filterValue = value.toLowerCase();
    return arrayToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }

}
