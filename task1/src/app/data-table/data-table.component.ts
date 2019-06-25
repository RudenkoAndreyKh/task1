import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { AuthServiceService } from '../services/auth-service.service';
import { TableUpdateService } from '../services/update-table.service';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DataTableItem>;

  dataSource: DataTableDataSource;
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(
    private authService: AuthServiceService,
    private updateTable: TableUpdateService,
    public dialog: MatDialog,
    private httpReq: HttpRequestService) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit() {
    this.httpReq.getAllUsers()
      .subscribe((res:any[]) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = res;
        this.table.dataSource = this.dataSource;
      })
    this.dataSource = new DataTableDataSource();
    this.updateTable.usersTableUpdateAnnounced$.subscribe(
      (data: DataTableItem[]) => {
        this.table.dataSource = new MatTableDataSource<DataTableItem>(data);
      });
  }

  deleteUser(userId) {
    this.authService.deleteUser(userId)
      .subscribe(() => {
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
  }

  editUser(user) {
    this.dialog.open(EditUserModalComponent, { width: '450px', data: user });
  }

}
