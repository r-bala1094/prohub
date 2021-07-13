import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSectionService } from '../../../../services/control-section.service';

@Component({
  selector: 'prohub-local-expert',
  templateUrl: './local-expert.component.html',
  styleUrls: ['./local-expert.component.scss']
})
export class LocalExpertComponent implements OnInit {

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
