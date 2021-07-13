import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ControlSectionService } from './create-project/services/control-section.service';
import { HttpClientModule } from '@angular/common/http';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WebMaterialModule } from 'libs/web/material/src/lib/web-material.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactusComponent } from './contactus/contactus.component';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'create-project',
    // canActivate:
    loadChildren: () =>
      import('./create-project/create-project.module').then(
        (m) => m.CreateProjectModule
      ),
  },
  {
    path: 'milestones',
    loadChildren: () =>
      import('./milestones/milestones.module').then((m) => m.MilestonesModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client-panel/client-panel.module').then((m) => m.ClientPanelModule),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./member-panel/member-panel.module').then((m) => m.MemberPanelModule),
  },
  {
    path: 'ask-question',
    loadChildren: () =>
      import('./ask-question/ask-question.module').then((m) => m.AskQuestionModule),
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'howitworks',
    component: HowItWorksComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path:'feedbackform',
    component: FeedbackComponent
  },
  {
    path:'contactus',
    component:ContactusComponent
  }
]

@NgModule({
  declarations: [AppComponent, LandingPageComponent, HowItWorksComponent, AboutUsComponent, FeedbackComponent, ContactusComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    WebMaterialModule,
  ],
  providers: [ControlSectionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
