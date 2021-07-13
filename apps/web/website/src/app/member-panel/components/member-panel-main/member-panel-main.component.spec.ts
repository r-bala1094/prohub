import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPanelMainComponent } from './member-panel-main.component';

describe('MemberPanelMainComponent', () => {
  let component: MemberPanelMainComponent;
  let fixture: ComponentFixture<MemberPanelMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPanelMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
