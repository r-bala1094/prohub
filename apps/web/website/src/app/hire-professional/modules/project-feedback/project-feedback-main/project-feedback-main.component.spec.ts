import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedbackMainComponent } from './project-feedback-main.component';

describe('ProjectFeedbackMainComponent', () => {
  let component: ProjectFeedbackMainComponent;
  let fixture: ComponentFixture<ProjectFeedbackMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFeedbackMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFeedbackMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
