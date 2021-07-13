import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPanelMainComponent } from './client-panel-main.component';

describe('ClientPanelMainComponent', () => {
  let component: ClientPanelMainComponent;
  let fixture: ComponentFixture<ClientPanelMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPanelMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
