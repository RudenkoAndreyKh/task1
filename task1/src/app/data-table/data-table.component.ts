import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';
import axios from 'axios';

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

  constructor(private Auth: AuthServiceService){
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit() {
    axios.get('http://localhost:3000/users')
    .then(res => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = res.data;


      this.table.dataSource = this.dataSource;
    })
    
    //this.table.dataSource = this.dataSource;
  }

  deleteUser(userId) {
    this.Auth.deleteUser(userId);
    console.log("succesfully deletet", userId);
  }

  editUser(userId) {
    console.log("succesfully edited", userId);
  }

  ngAfterViewInit() {
    
  }
}
