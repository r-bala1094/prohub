import { ControlSectionService } from './../../../../services/control-section.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'prohub-description-attachment',
  templateUrl: './description-attachment.component.html',
  styleUrls: ['./description-attachment.component.scss']
})
export class DescriptionAttachmentComponent implements OnInit {

  filesListFromServer = []

  descriptionInfo: FormGroup = new FormGroup({
    briefDescription: new FormControl('', Validators.minLength(50)),
    documents: new FormControl(),
    anyOtherRequirements: new FormControl(),
  });

  constructor(public controlSectionService:ControlSectionService) { }

  ngOnInit(): void {
  }

  handleUpload(file) {
      this.controlSectionService.filesListFromClient.push(file[0]);
      console.log(file[0]);

    this.controlSectionService.uploadBasicInfoFiles();
  }

  deleteFile(index) {
    this.controlSectionService.filesListFromClient.splice(index, 1);
    this.controlSectionService.uploadBasicInfoFiles();
  }

}
