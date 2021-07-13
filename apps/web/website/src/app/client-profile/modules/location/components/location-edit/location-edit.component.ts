import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebCommonService } from 'apps/web/website/src/app/services/web-common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientProfileService } from '../../../../services/client-profile.service';

@Component({
  selector: 'prohub-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit {

  locationDetails: FormGroup;
  states = [];
  statesResponse = [];
  selectedState;
  timeZones = [];
  timeZonesResponse = [];
  selectedTimeZone;
  countries = [];
  countriesResponse = [];
  selectedCountry;
  filteredTimeZones: Observable<string[]>;
  filteredCountries: Observable<string[]>;
  filteredStates: Observable<string[]>;
  @Input ('details') details: any;
  @Output() toggleEditMode = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private commonService: WebCommonService,
    private clientService: ClientProfileService
  ) {
    this.locationDetails = this.fb.group({
      timeZone: [''],
      addressLine1: [''],
      addressLine2: [''],
      country: [''],
      state: [''],
      city: [''],
      zipCode: ['']
    })
  }

  ngOnInit(): void {
    this.commonService.getTimeZonesList('', null, '').subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.timeZonesResponse = res.response.data;
        this.timeZonesResponse.forEach(value => {
          this.timeZones.push(value.TimeZone);
        });
        this.filteredTimeZones = this.locationDetails.controls['timeZone'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.timeZones))
        );
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.commonService.getCountriesList('', null, '').subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.countriesResponse = res.response.data;
        this.countriesResponse.forEach(value => {
          this.countries.push(value.name);
        });
        this.filteredCountries = this.locationDetails.controls['country'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.countries))
        );
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.locationDetails.controls['country'].valueChanges.subscribe(value => {
      if (this.countriesResponse) {
        this.selectedCountry = this.countriesResponse.filter(data => data.name === value)[0];
        this.locationDetails.controls['state'].setValue('');
        if (this.selectedCountry) {
          this.commonService.getStatesList('', null, this.selectedCountry.code).subscribe((res: any) => {
            this.states = [];
            this.statesResponse = [];
            if (res.response && res.response.data) {
              this.statesResponse = res.response.data;
              this.statesResponse.forEach(value => {
                this.states.push(value.Subdivision_Name);
              });
              this.filteredStates = this.locationDetails.controls['state'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, this.states))
              );
            }
          });
        }
      }
    });

    this.locationDetails.controls['timeZone'].valueChanges.subscribe(value => {
      this.selectedTimeZone = this.timeZonesResponse.filter(data => data.TimeZone === value)[0];
    });

    this.locationDetails.controls['state'].valueChanges.subscribe(value => {
      this.selectedState = this.statesResponse.filter(data => data.Subdivision_Name === value)[0];
    });
  }

  ngOnChanges() {
    if (this.details) {
      this.setData();
    }
  }

  setData() {
    this.locationDetails.patchValue({
      timeZone: this.details.timeZone ? this.details.timeZone.TimeZone : '',
      addressLine1: this.details.addressLineOne,
      addressLine2: this.details.addressLineTwo,
      country: this.details.country ? this.details.country.name : '',
      state: this.details.state ? this.details.state.Subdivision_Name : '',
      city: this.details.city,
      zipCode: this.details.zipCode
    });
    this.selectedTimeZone = this.details.timeZone;
    this.selectedCountry = this.details.country;
    this.selectedState = this.details.state;
    this.commonService.getStatesList('', null, this.selectedCountry.code).subscribe((res: any) => {
      this.states = [];
      this.statesResponse = [];
      if (res.response && res.response.data) {
        this.statesResponse = res.response.data;
        this.statesResponse.forEach(value => {
          this.states.push(value.Subdivision_Name);
        });
        this.filteredStates = this.locationDetails.controls['state'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.states))
        );
      }
    });
  }

  onUpdateClick() {
    const locDetails = this.locationDetails.value;
    const resultData = {
      timeZone: this.selectedTimeZone,
      addressLineOne: locDetails.addressLine1,
      addressLineTwo: locDetails.addressLine2,
      country: this.selectedCountry,
      state: this.selectedState,
      city: locDetails.city,
      zipCode: locDetails.zipCode
    }
    this.clientService.putLocation(resultData).subscribe((res: any) => {
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
