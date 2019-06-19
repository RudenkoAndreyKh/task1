import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDialog, MatTableDataSource } from '@angular/material';
import { ItemsDataTableDataSource, ItemsDataTableItem } from './items-data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';
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
export class ItemsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ItemsDataTableItem>;
  dataSource: ItemsDataTableDataSource;
  constructor(public dialog: MatDialog, private httpReq: HttpRequestService, private updateTable: TableUpdateService) {
    axios.get(environment.domain + '/games')
      .then(res => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = res.data;

        this.table.dataSource = this.dataSource;
      })
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'actions'];

  ngOnInit() {
    this.dataSource = new ItemsDataTableDataSource();
    this.updateTable.tableUpdateAnnounced$.subscribe(
      (data: ItemsDataTableItem[]) => {
        // this.dataSource.data = data;
        this.table.dataSource = new MatTableDataSource<ItemsDataTableItem>(data);
      });
  }

  deleteItem(itemId) {
    this.httpReq.deleteItem(itemId, this.dataSource.data).then(res => {
      let ds = this.dataSource.data;
      for (let i = 0; i < ds.length; i++) {
        if (ds[i].id == itemId) {
          debugger;
          ds.splice(i, 1);
          break;
        }
      }
      this.dataSource.data = ds;
      this.table.dataSource = new MatTableDataSource<ItemsDataTableItem>(ds);
    });
  }

  editItem(item) {
    this.dialog.open(EditModalComponent, { width: '450px', data: item });
  }

  createNewItem() {
    this.dialog.open(CreateNewItemModalComponent, { width: '450px', data: this })
  }

  async add(newItem) {
    console.log(this);
    await this.httpReq.addItem(newItem);
    let ds;
    axios.get(environment.domain + '/games')
      .then(res => {
        ds = res.data;
        this.table.dataSource = new MatTableDataSource<ItemsDataTableItem>(ds);
      })
  }

  ngAfterViewInit() {

  }
}
