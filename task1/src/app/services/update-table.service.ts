import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { ItemsDataTableItem } from '../items-data-table/items-data-table-datasource';

@Injectable({
    providedIn: 'root',
  })

export class TableUpdateService{
    private tableUpdateAnnouncedSource = new Subject<object>();
    tableUpdateAnnounced$ = this.tableUpdateAnnouncedSource;

    announcedTableUpdate(data:ItemsDataTableItem){
        this.tableUpdateAnnouncedSource.next(data);
    }
} 