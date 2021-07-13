import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalExpertComponent } from './local-expert.component';

describe('LocalExpertComponent', () => {
  let component: LocalExpertComponent;
  let fixture: ComponentFixture<LocalExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalExpertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
