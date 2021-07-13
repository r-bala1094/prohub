import { ProjectService } from './../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  userType="Client"

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {

    this.getProjectsList()
  
  }

  projectsList: any = []

  projects: any = [


    {
      projectTitle: "Landing Page",
      category: "Architecture & Engineering",
      Price: "Fixed Price: $1300",
      level: "Expert",
      projectCompletionDate: "June 12, 2021",
      description: "Lorem ipsum is a dummy text",
      skills: [
        "UI", "Builder", "Full Stack", "Angular Developer"
      ],
      proposals: "10 to 16",
      status: "Inprogress" 
    },

    {
      projectTitle: "Landing Page",
      category: "Architecture & Engineering",
      Price: "Fixed Price: $1300",
      level: "Expert",
      projectCompletionDate: "June 12, 2021",
      description: "Lorem ipsum is a dummy text",
      skills: [
        "UI", "Builder", "Full Stack", "Angular Developer"
      ],
      proposals: "10 to 16",
      status: "Completed" 
    },

    {
      projectTitle: "Landing Page",
      category: "Architecture & Engineering",
      Price: "Fixed Price: $1300",
      level: "Expert",
      projectCompletionDate: "June 12, 2021",
      description: "Lorem ipsum is a dummy text",
      skills: [
        "UI", "Builder", "Full Stack", "Angular Developer"
      ],
      proposals: "10 to 16",
      status: "Drafts" 
    }

  ]

  getProjectsList() {
    let projects: any = [];
    this.projectService.getProjects().subscribe(
      (response: any) => {
        projects.push(response.response.data);
        console.log('response', projects);
        this.projectsList = projects;
      }
    )
    return this.projectsList;
  }

}
