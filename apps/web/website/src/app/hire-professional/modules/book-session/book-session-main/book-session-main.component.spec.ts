import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSessionMainComponent } from './book-session-main.component';

describe('BookSessionMainComponent', () => {
  let component: BookSessionMainComponent;
  let fixture: ComponentFixture<BookSessionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSessionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSessionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
