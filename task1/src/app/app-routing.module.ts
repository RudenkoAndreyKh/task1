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
import { NotAuthGuard } from './guards/not-auth-guard.service';

const routes: Routes = [
  { path: 'registration', component: AuthPageComponent, canActivate: [AuthGuard] },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: './admin-page/admin-page.module#AdminPageModule' },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'game-details/:id', component: ItemDetailComponent },
  { path: 'user-page', canActivate: [NotAuthGuard], loadChildren: './user-info-page/user-info-page.module#UserInfoPageModule' },
  { path: 'test-page', component: TestComponentComponent, canActivate: [AdminGuard] },
  { path: 'order-page', component: ShoppingCartComponent, canActivate: [NotAuthGuard] },
  { path: '', component: MainPageComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
