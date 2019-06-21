import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { TableUpdateService } from '../services/update-table.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(private Auth: AuthServiceService, private updateTable: TableUpdateService) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit() {
    axios.get(environment.domain + '/users')
      .then(res => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = res.data;


        this.table.dataSource = this.dataSource;
      })

    this.dataSource = new DataTableDataSource();
    this.updateTable.usersTableUpdateAnnounced$.subscribe(
      (data: DataTableItem[]) => {
        this.table.dataSource = new MatTableDataSource<DataTableItem>(data);
      });
  }

  deleteUser(userId) {
    this.Auth.deleteUser(userId)
      .then(res => {
        let dataSource = this.dataSource.data;
        for (let i = 0; i < dataSource.length; i++) {
          if (dataSource[i].id == userId) {
            dataSource.splice(i, 1);
            break;
          }
        }
        this.dataSource.data = dataSource;
        this.table.dataSource = new MatTableDataSource<DataTableItem>(dataSource);
      })
    console.log("succesfully deletet", userId);
  }

  editUser(userId) {
    console.log("succesfully edited", userId);
  }

  ngAfterViewInit() {

  }
}
