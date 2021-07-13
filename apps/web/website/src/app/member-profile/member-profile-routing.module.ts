import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'upload-cv',
    loadChildren: () =>
      import('./upload-cv/upload-cv.module').then(
        (m) => m.UploadCvModule
      ),
  },
  {
    path: 'profile-info',
    loadChildren: () =>
      import('./profile-info/profile-info.module').then(
        (m) => m.ProfileInfoModule
      ),
  },
  {
    path: 'about-me',
    loadChildren: () =>
      import('./about-me/about-me.module').then(
        (m) => m.AboutMeModule
      ),
  },
  {
    path: 'work-experience',
    loadChildren: () =>
      import('./work-experience/work-experience.module').then(
        (m) => m.WorkExperienceModule
      ),
  },
  {
    path: 'education',
    loadChildren: () =>
      import('./education/education.module').then(
        (m) => m.EducationModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories-and-skills/categories-and-skills.module').then(
        (m) => m.CategoriesAndSkillsModule
      ),
  },
  {
    path: 'project-services',
    loadChildren: () =>
      import('./project-services/project-services.module').then(
        (m) => m.ProjectServicesModule
      ),
  },
  {
    path: 'intro-video',
    loadChildren: () =>
    import('./intro-video/intro-video.module').then(
      (m) => m.IntroVideoModule
    ),
  },
  {
    path: 'hourly-rates',
    loadChildren: () =>
      import('./hourly-rates/hourly-rates.module').then(
        (m) => m.HourlyRatesModule
      ),
  },
  {
    path: 'availability',
    loadChildren: () =>
      import('./availability/availability-routing.module').then(
        (m) => m.AvailabilityRoutingModule
      ),
  },
  
  {
    path: 'modeofwork',
    loadChildren: () =>
      import('./mode-of-work/mode-of-work-routing.module').then(
        (m) => m.ModeOfWorkRoutingModule
      ),
},
{
  path: 'location',
  loadChildren: () =>
    import('./location/location-routing.module').then(
      (m) => m.LocationRoutingModule
    ),
},
{
  path: 'language',
  loadChildren: () =>
    import('./language/language-routing.module').then(
      (m) => m.LanguageRoutingModule
    ),
},
  { path: '',   redirectTo: '/auth/signup/individualMemberSignup/steps/upload-cv', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberProfileRoutingModule { }
