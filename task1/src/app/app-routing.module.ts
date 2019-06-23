import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { ShoppingCartComponent } from './shopping-cart-page/shopping-cart.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';

const routes: Routes = [
  { path: 'registration', component: AuthPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'game-details/:id', component: ItemDetailComponent },
  { path: 'user-page', component: UserInfoPageComponent, canActivate: [AuthGuard] },
  {path: 'test-page', component: TestComponentComponent, canActivate: [AdminGuard]},
  {path: 'order-page', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  { path: '', component: MainPageComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
