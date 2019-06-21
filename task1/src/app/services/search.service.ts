import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';

  constructor(private http: Http) { }

  search(terms: Subject<string>) {
    return terms.pipe(debounceTime(400))
      .pipe(switchMap(term => this.searchEntries(term)))

  }

  searchEntries(term) {
    return this.http
      .get(environment.domain + `/games/${term}`)
      .pipe(
        map(res => res.json())
      )

  }
}