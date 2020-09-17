import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  { path: 'airline', component: MainPageComponent},
  { path: '', redirectTo: '/airline', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
