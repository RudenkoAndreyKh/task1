import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import {Item} from '../models/Item'

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  Auth: AuthServiceService;
  items:Item[] = [];
  constructor() {
    this.Auth = new AuthServiceService();
  }

  async ngOnInit() {
    await this.Auth.getAllGames()
    .then(res => {
      this.items = res.data;
    })
  }

}
