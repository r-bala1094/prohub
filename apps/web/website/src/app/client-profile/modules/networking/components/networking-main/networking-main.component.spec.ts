import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingMainComponent } from './networking-main.component';

describe('NetworkingMainComponent', () => {
  let component: NetworkingMainComponent;
  let fixture: ComponentFixture<NetworkingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
