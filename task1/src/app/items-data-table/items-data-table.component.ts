import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDialog } from '@angular/material';
import { ItemsDataTableDataSource, ItemsDataTableItem } from './items-data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-items-data-table',
  templateUrl: './items-data-table.component.html',
  styleUrls: ['./items-data-table.component.css']
})
export class ItemsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ItemsDataTableItem>;
  dataSource: ItemsDataTableDataSource;
  Auth: AuthServiceService;

  constructor(public dialog: MatDialog){

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'actions'];

  ngOnInit() {
    this.dataSource = new ItemsDataTableDataSource();
    this.Auth = new AuthServiceService();
  }

  deleteItem(itemId) {
    this.Auth.deleteItem(itemId);
    console.log("succesfully deletet", itemId);
  }

  editItem(item) {
    this.dialog.open(EditModalComponent, {width: '250px',data: item});
    console.log("succesfully edited", item);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
