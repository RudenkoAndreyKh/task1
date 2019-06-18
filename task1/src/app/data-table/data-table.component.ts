import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  Auth: AuthServiceService;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
    this.Auth = new AuthServiceService();
  }

  deleteUser(userId) {
    this.Auth.deleteUser(userId);
    console.log("succesfully deletet", userId);
  }

  editUser(userId) {
    console.log("succesfully edited", userId);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
