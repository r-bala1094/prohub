import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'prohub-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

  public readonly form: FormGroup =  new FormGroup({
    availability: new FormControl(""),
    workingCapacity: new FormControl("")
  })

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  availabilities:any[]=
    [
      {
        avialabilityTypeId: 1,
        avialabilityType: 'Available'
      },
      {
        avialabilityTypeId: 2,
        avialabilityType: 'Unavailable'
      },
      {
        avialabilityTypeId: 3,
        avialabilityType: 'Unavailable till'
      }
    ];
    workingCapacities:any[]=
      [
        {
          workCapacityTypeId: 1,
          workCapacityType: 'Full Time'
        },
        {
          workCapacityTypeId: 2,
          workCapacityType: 'Part Time'
        },
        {
          workCapacityTypeId: 3,
          workCapacityType: 'Casual (less than 10 hours per week)'
        }
      ]

      save() {
        let body: any = this.form.value
        console.log(body)

      }

      handleMovePage(buttonType: string) {
        let body: any = this.form.value
        console.log(body)
        const url = buttonType === 'back' ? 'hourly-rates' : 'modeofwork';
        this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
      }

}
