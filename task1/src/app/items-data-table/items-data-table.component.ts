import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDialog, MatTableDataSource } from '@angular/material';
import { ItemsDataTableDataSource, ItemsDataTableItem } from './items-data-table-datasource';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import axios from 'axios';
import { CreateNewItemModalComponent } from '../create-new-item-modal/create-new-item-modal.component';
import { environment } from '../../environments/environment';
import { TableUpdateService } from '../services/update-table.service';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-items-data-table',
  templateUrl: './items-data-table.component.html',
  styleUrls: ['./items-data-table.component.css']
})
export class ItemsDataTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ItemsDataTableItem>;
  dataSource: ItemsDataTableDataSource;
  displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(public dialog: MatDialog, private httpReq: HttpRequestService, private updateTable: TableUpdateService) {
    this.httpReq.getAllGames()
      .then(res => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = res.data;
        this.table.dataSource = this.dataSource;
      })
  }

  ngOnInit() {
    this.dataSource = new ItemsDataTableDataSource();
    this.updateTable.tableUpdateAnnounced$.subscribe(
      (data: ItemsDataTableItem[]) => {
        this.table.dataSource = new MatTableDataSource<ItemsDataTableItem>(data);
      });
  }

  deleteItem(itemId) {
    this.httpReq.deleteItem(itemId, this.dataSource.data).then(res => {
      let dataSource = this.dataSource.data;
      for (let i = 0; i < dataSource.length; i++) {
        if (dataSource[i].id == itemId) {
          dataSource.splice(i, 1);
          break;
        }
      }
      this.dataSource.data = dataSource;
      this.table.dataSource = new MatTableDataSource<ItemsDataTableItem>(dataSource);
    });
  }

  editItem(item) {
    this.dialog.open(EditModalComponent, { width: '450px', data: item });
  }

  createNewItem() {
    this.dialog.open(CreateNewItemModalComponent, { width: '450px', data: this })
  }

}
