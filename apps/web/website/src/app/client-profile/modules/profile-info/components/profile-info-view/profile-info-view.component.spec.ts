import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoViewComponent } from './profile-info-view.component';

describe('ProfileInfoViewComponent', () => {
  let component: ProfileInfoViewComponent;
  let fixture: ComponentFixture<ProfileInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
