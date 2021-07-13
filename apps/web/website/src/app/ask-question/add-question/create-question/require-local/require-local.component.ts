import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSectionService } from '../../../../create-project/services/control-section.service';

@Component({
  selector: 'prohub-require-local',
  templateUrl: './require-local.component.html',
  styleUrls: ['./require-local.component.scss']
})
export class RequireLocalComponent implements OnInit {

  countries;
  cities;


  localExpertInfo: FormGroup = new FormGroup({
    requireLocalExpert: new FormControl(),
    selectedCountry: new FormControl(),
    selectedCity: new FormControl()
  });

  showDetails = false;

  constructor(private controlSectionService : ControlSectionService) { }

  ngOnInit(): void {
  
    this.cities = [
      "Chennai",
      "Coimbatore",
      "Mumbai",
      "Delhi",
    ]
    this.controlSectionService.getListOfCountries().subscribe((res) => {
      this.countries = res['response'].data
    }, (err: any)=> {
      console.log(err);
    })
    this.localExpertInfo.valueChanges.subscribe(data => {
        this.showDetails = !!data.requireLocalExpert;
    })
  }

  compareCity(city1, city2) {
    return city1 && city2 && city1 === city2;
  }

  compareCountry(c1, c2) {
    return c1 && c2 && c1.objectId === c2.objectId;
  }

}
