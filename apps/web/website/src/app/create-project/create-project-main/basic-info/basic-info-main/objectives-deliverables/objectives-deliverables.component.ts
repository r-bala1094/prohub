import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlSectionService } from '../../../../services/control-section.service';

@Component({
  selector: 'prohub-objectives-deliverables',
  templateUrl: './objectives-deliverables.component.html',
  styleUrls: ['./objectives-deliverables.component.scss']
})
export class ObjectivesDeliverablesComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredObjectives: Observable<any[]>;
  filteredDeliverables: Observable<any[]>;
  allObjectives: string[] = [];
  allDeliverables = [];

  objectivesInfo = new FormGroup({
    objectivesChipList: new FormControl([]),
    objectiveInput: new FormControl(),
    deliverablesChipList: new FormControl([]),
    deliverableInput: new FormControl(),
  })


  constructor(private controlSectionService : ControlSectionService) {
    this.filteredObjectives = this.objectivesInfo.get('objectiveInput').valueChanges.pipe(
        startWith(null),
        map((obj: string | null) => obj ? this._filter(obj, this.allObjectives) : this.allObjectives.slice()));

    this.filteredDeliverables = this.objectivesInfo.get('deliverableInput').valueChanges.pipe(
      startWith(null),
      map((del: string | null) => del ? this._filter(del, this.allDeliverables) : this.allDeliverables.slice()));

  }
      
  ngOnInit() {
    this.controlSectionService.getListofDeliverables().subscribe(res => {
      this.allDeliverables = res['response'].data;
      this.filteredDeliverables = of(this.allDeliverables)
    }, (err: any)=> {
      console.log(err);
    })
    this.controlSectionService.getListOfCategories().subscribe(res => {
      this.allObjectives = res['response'].data;
      this.filteredObjectives = of(this.allObjectives)
    })
  }

  get objectivesChipList() {
    return this.objectivesInfo.get('objectivesChipList');
  }

  get deliverablesChipList() {
    return this.objectivesInfo.get('deliverablesChipList');
  }

  removeObjective(obj: string): void {
    const index = this.objectivesChipList.value.indexOf(obj);

    if (index >= 0) {
      this.objectivesChipList.value.splice(index, 1);
    }
  }

  selectedObjective(event: MatAutocompleteSelectedEvent): void {
    this.objectivesInfo.patchValue({
      objectivesChipList: [...this.objectivesChipList.value, event.option.value],
      objectiveInput: ''
    });
  }

  removeDeliverable(del: string): void {
    const index = this.deliverablesChipList.value.indexOf(del);

    if (index >= 0) {
      this.deliverablesChipList.value.splice(index, 1);
    }
  }

  selectedDeliverable(event: MatAutocompleteSelectedEvent): void {
    this.objectivesInfo.patchValue({
      deliverablesChipList: [...this.deliverablesChipList.value, event.option.value],
      deliverableInput: ''
    });
  }

  private _filter(value: string, arrayToFilter: string[]): string[] {
    const filterValue = value.toLowerCase();

    return arrayToFilter.filter(val => val.toLowerCase().indexOf(filterValue) === 0);
  }
}
