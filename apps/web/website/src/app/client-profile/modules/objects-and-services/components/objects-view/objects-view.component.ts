import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-objects-view',
  templateUrl: './objects-view.component.html',
  styleUrls: ['./objects-view.component.scss']
})
export class ObjectsViewComponent implements OnInit {

  objectives = [];

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
    this.objectives = [];
    this.details.forEach(detail => {
      this.objectives.push(detail.category)
    });
  }

}
