import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectMainComponent } from './create-project-main.component';

describe('CreateProjectMainComponent', () => {
  let component: CreateProjectMainComponent;
  let fixture: ComponentFixture<CreateProjectMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
