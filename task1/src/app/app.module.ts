import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { UserInfoService } from './services/user-info-service.service';
import { StoreListComponent } from './store-list/store-list.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatDialog, MatDialogModule, MatButtonModule, MatMenuModule, MatCardModule, MatToolbarModule, MatIconModule, MatInputModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { ItemsDataTableComponent } from './items-data-table/items-data-table.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AuthServiceService } from './services/auth-service.service';
import { HttpRequestService } from './services/http-request.service';
import { CreateNewItemModalComponent } from './create-new-item-modal/create-new-item-modal.component';
import { DescriptionSizePipe } from './pipes/descriptio-size.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Extensions } from './services/extensions.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchService } from './services/search.service';
import { TestComponentComponent } from './test-component/test-component.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ShoppingCartComponent } from './shopping-cart-page/shopping-cart.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';

import { NgxImageCompressService } from 'ngx-image-compress';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { NotAuthGuard } from './guards/not-auth-guard.service';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    //AdminPageComponent,
    LoginPageComponent,
    StoreListComponent,
    //DataTableComponent,
    //ItemsDataTableComponent,
    EditModalComponent,
    CreateNewItemModalComponent,
    DescriptionSizePipe,
    PageNotFoundComponent,
    ItemDetailComponent,
    //UserInfoPageComponent,
    FilterPipe,
    TestComponentComponent,
    ShoppingCartComponent,
    EditUserModalComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    HttpClientModule,
  ],
  providers: [
    UserInfoService, 
    AuthServiceService, 
    HttpRequestService, 
    Extensions,
    SearchService,
    AuthGuard,
    AdminGuard,
    HttpClient, 
    NgxImageCompressService,
    NotAuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditModalComponent, CreateNewItemModalComponent, EditUserModalComponent]
})
export class AppModule { }
