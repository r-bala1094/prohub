import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListMainComponent } from './projects-list-main.component';

describe('ProjectsListMainComponent', () => {
  let component: ProjectsListMainComponent;
  let fixture: ComponentFixture<ProjectsListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsListMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
