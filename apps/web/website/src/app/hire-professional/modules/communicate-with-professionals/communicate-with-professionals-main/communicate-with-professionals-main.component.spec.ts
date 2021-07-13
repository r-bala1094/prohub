import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicateWithProfessionalsMainComponent } from './communicate-with-professionals-main.component';

describe('CommunicateWithProfessionalsMainComponent', () => {
  let component: CommunicateWithProfessionalsMainComponent;
  let fixture: ComponentFixture<CommunicateWithProfessionalsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicateWithProfessionalsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicateWithProfessionalsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
