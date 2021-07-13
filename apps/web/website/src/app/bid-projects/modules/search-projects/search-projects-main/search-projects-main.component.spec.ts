import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectsMainComponent } from './search-projects-main.component';

describe('SearchProjectsMainComponent', () => {
  let component: SearchProjectsMainComponent;
  let fixture: ComponentFixture<SearchProjectsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProjectsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
