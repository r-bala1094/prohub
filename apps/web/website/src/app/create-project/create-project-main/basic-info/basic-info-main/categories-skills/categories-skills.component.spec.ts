import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSkillsComponent } from './categories-skills.component';

describe('CategoriesSkillsComponent', () => {
  let component: CategoriesSkillsComponent;
  let fixture: ComponentFixture<CategoriesSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
