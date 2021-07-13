import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'prohub-company-info-edit',
  templateUrl: './company-info-edit.component.html',
  styleUrls: ['./company-info-edit.component.scss']
})
export class CompanyInfoEditComponent implements OnInit {

  rolesInfo : FormGroup;
  roles = ['Architecture', '2d & 3d', 'Landscape Designing', '2BHK', '3BHK', '2d & 3d Rendering', 'Architecture & Engineering', '3BHK', '2d & 3d Rendering'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  employees = ['1-9 employees', '10-99 employees', '100-499 employees']

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rolesInfo = this.fb.group({
      companyRolesChipList: [''],
      roleInput: ['']
    });
  }
  
  removeObjective(objective) {
    console.log(objective);
  }

  selectedObjective(event: MatAutocompleteSelectedEvent): void {
    this.rolesInfo.patchValue({
      companyRolesChipList: [...this.companyRolesChipList.value, event.option.value],
      roleInput: ''
    });
  }

  get companyRolesChipList() {
    return this.rolesInfo.get('companyRolesChipList');
  }

}
