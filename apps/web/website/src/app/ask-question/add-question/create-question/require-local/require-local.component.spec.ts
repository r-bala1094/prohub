import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireLocalComponent } from './require-local.component';

describe('RequireLocalComponent', () => {
  let component: RequireLocalComponent;
  let fixture: ComponentFixture<RequireLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequireLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
