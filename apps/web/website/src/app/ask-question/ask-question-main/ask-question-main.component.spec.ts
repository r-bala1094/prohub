import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionMainComponent } from './ask-question-main.component';

describe('AskQuestionMainComponent', () => {
  let component: AskQuestionMainComponent;
  let fixture: ComponentFixture<AskQuestionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskQuestionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
