import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [
  { path: 'authentification', component: AuthPageComponent },
  { path: '', component: MainPageComponent },
  {path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
