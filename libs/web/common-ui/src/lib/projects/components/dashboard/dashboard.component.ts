import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  stats: any[] = [
    {
      title: 'Active Projects',
      statsCount: 6
    },
    {
      title: 'PROJECTS COMPLETED',
      statsCount: 6
    },
    {
      title: 'TOTAL MEMBERS',
      statsCount: 6
    },
    {
      title: 'MEMBERS HIRED',
      statsCount: 6
    },
  ]
}
