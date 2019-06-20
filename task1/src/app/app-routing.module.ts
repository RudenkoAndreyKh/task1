import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';

const routes: Routes = [
  { path: 'registration', component: AuthPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'game-details/:id', component: ItemDetailComponent },
  { path: 'user-page', component: UserInfoPageComponent },
  { path: '', component: MainPageComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
