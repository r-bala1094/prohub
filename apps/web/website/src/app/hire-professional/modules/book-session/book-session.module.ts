import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSessionRoutingModule } from './book-session-routing.module';
import { BookSessionMainComponent } from './book-session-main/book-session-main.component';


@NgModule({
  declarations: [
    BookSessionMainComponent
  ],
  imports: [
    CommonModule,
    BookSessionRoutingModule
  ]
})
export class BookSessionModule { }
