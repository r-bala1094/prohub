import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListMainComponent } from './members-list-main.component';

describe('MembersListMainComponent', () => {
  let component: MembersListMainComponent;
  let fixture: ComponentFixture<MembersListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersListMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
