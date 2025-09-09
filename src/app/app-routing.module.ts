import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./pages/quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./pages/setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('./pages/results/results.module').then((m) => m.ResultsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
