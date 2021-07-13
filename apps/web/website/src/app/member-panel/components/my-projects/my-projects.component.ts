import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  stats: any[] = [
    {
      title: 'ACTIVE  PROJECTS',
      statsCount: 6
    },
    {
      title: 'PROJECTS COMPLETED',
      statsCount: 6
    },
    {
      title: 'Partnership and/or mentor',
      statsCount: 6
    },
    {
      title: 'Project Submission',
      statsCount: 6
    },
  ]

}
