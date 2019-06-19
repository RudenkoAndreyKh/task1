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
import { MatTableModule, MatPaginatorModule, MatSortModule, MatDialog, MatDialogModule, MatButtonModule, MatMenuModule, MatCardModule, MatToolbarModule, MatIconModule, MatInputModule } from '@angular/material';
import { ItemsDataTableComponent } from './items-data-table/items-data-table.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AuthServiceService } from './services/auth-service.service';
import { HttpRequestService } from './services/http-request.service';
import { CreateNewItemModalComponent } from './create-new-item-modal/create-new-item-modal.component';
import { DescriptionSizePipe } from './pipes/descriptio-size.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Extensions } from './services/extensions.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    HeaderComponent,
    StoreListComponent,
    DataTableComponent,
    ItemsDataTableComponent,
    EditModalComponent,
    CreateNewItemModalComponent,
    DescriptionSizePipe
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
    AngularFontAwesomeModule
  ],
  providers: [UserInfoService, AuthServiceService, HttpRequestService, Extensions],
  bootstrap: [AppComponent],
  entryComponents: [EditModalComponent, CreateNewItemModalComponent]
})
export class AppModule { }
