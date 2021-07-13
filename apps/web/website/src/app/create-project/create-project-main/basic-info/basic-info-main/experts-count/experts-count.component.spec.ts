import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsCountComponent } from './experts-count.component';

describe('ExpertsCountComponent', () => {
  let component: ExpertsCountComponent;
  let fixture: ComponentFixture<ExpertsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
