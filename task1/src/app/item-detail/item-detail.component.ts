import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Item } from '../models/Item';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item;

  private id: number;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private httpReq: HttpRequestService) {

    this.routeSubscription = route.params.subscribe((params: Item) => {
      this.id = params['id'];
    });

  }

  async ngOnInit() {
    await this.httpReq.getUserById(this.id).then(res => {
      this.item = res.data;
    })
  }

}
