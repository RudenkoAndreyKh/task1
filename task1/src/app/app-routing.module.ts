import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'registration', component: AuthPageComponent },
  // { path: 'game/:id',      component: HeroDetailComponent },
  { path: '', component: MainPageComponent },
  {path: 'admin', component: AdminPageComponent},
  {path: 'login', component: LoginPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
