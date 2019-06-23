import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from '../../environments/environment';
import axios from 'axios';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  searchItems = new FormControl();
  filteredItems: any;
  isLoading = false;
  errorMsg: string;
  searchingValue: string;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.searchItems.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredItems = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.domain + `/games`)
          .pipe(
            finalize(() => {
              this.searchingValue = value;
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(res => {
        let data = <any>res;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.toLowerCase().includes(this.searchingValue)) {
            this.filteredItems.push(data[i]);
          }
        }
      });
  }

}
