import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserInfoPageRoutingModule } from './user-info-page-routing.module';
import { UserInfoPageComponent } from './user-info-page.component';
import { MatPaginatorModule, MatSortModule, MatMenuModule, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UserInfoPageComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        UserInfoPageRoutingModule,
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
    ],
    providers: []
})
export class UserInfoPageModule {

}