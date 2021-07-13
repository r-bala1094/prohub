import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsOfCommunicationMainComponent } from './methods-of-communication-main.component';

describe('MethodsOfCommunicationMainComponent', () => {
  let component: MethodsOfCommunicationMainComponent;
  let fixture: ComponentFixture<MethodsOfCommunicationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodsOfCommunicationMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodsOfCommunicationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
