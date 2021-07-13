import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProfileService } from '../../../../services/client-profile.service';

@Component({
  selector: 'prohub-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.scss']
})
export class ProfileInfoEditComponent {
  profilePic = '';
  profileDetails: FormGroup;
  @Output() toggleEditMode = new EventEmitter<any>();
  @Input('details') details: any;

  constructor(
    private fb: FormBuilder,
    private clientProfileService: ClientProfileService
  ) {
    this.profileDetails = this.fb.group({
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnChanges () {
    if (this.details) {
      this.setData();
    }
  }

  setData () {
    this.profileDetails.patchValue({
      firstName: this.details.firstname,
      surName: this.details.surname,
      email: this.details.email
    });
  }

  onUpdateClick() {
    const formValue = this.profileDetails.value;
    const resultData = {
      firstname: formValue.firstName,
      surname: formValue.surName,
      email: formValue.email
    };
    this.clientProfileService.postProfileInfo(resultData).subscribe((res: any) => {
      this.toggleEditMode.emit();
    },(err: any)=> {
      console.log(err);
    });
  }

  onCancelClick() {
    this.toggleEditMode.emit()
  }

}
