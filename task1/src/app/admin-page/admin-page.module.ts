import { NgModule } from "@angular/core";
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { DataTableComponent } from '../data-table/data-table.component';
import { ItemsDataTableComponent } from '../items-data-table/items-data-table.component';
import { MatPaginatorModule, MatSortModule, MatMenuModule, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatTableModule } from '@angular/material';

@NgModule({
    declarations: [
        AdminPageComponent,
        DataTableComponent,
        ItemsDataTableComponent,
    ],
    imports: [
        AdminPageRoutingModule,
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
export class AdminPageModule {

}