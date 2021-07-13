import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAttachmentComponent } from './description-attachment.component';

describe('DescriptionAttachmentComponent', () => {
  let component: DescriptionAttachmentComponent;
  let fixture: ComponentFixture<DescriptionAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
