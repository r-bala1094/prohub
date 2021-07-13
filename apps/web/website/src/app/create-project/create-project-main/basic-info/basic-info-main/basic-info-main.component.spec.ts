import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoMainComponent } from './basic-info-main.component';

describe('BasicInfoMainComponent', () => {
  let component: BasicInfoMainComponent;
  let fixture: ComponentFixture<BasicInfoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
