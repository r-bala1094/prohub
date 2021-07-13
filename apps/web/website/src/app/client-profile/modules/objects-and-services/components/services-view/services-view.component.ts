import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.scss']
})
export class ServicesViewComponent implements OnInit {

  categories = [];
  subCategories = [];
  skills = [];

  @Input ('details') details;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges () {
    if (this.details) {
      this.setData();
    }
  }

  setData () {
    this.categories = [];
    this.subCategories = [];
    this.skills = [];
    this.details.categories.forEach(detail => {
      this.categories.push(detail.category);
    });

    this.details.subCategories.forEach(detail => {
      this.subCategories.push(detail.subCategory);
    });

    this.details.skills.forEach(detail => {
      this.skills.push(detail.skill);
    });
  }

}
