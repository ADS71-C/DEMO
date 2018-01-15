import {Component, OnInit} from '@angular/core';
import {StompService} from '@stomp/ng2-stompjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {MongoService} from '../mongo.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
})
export class LatestComponent implements OnInit {
  latestAnalysis = [];
  topScoredAnalysis = [];
  stompSubscription: Observable<any>;
  showInfo = true

  constructor(
    private stompService: StompService,
    private mongoService: MongoService) {
  }

  ngOnInit() {
    this.stompSubscription = this.stompService.subscribe('/queue/6_latest', {'ack': 'client'});
    this.stompSubscription
      .map(message => message.body)
      .map(message => JSON.parse(message))
      .subscribe((message) => {

        this.latestAnalysis.unshift(message);
        if (this.latestAnalysis.length > 10) {
          this.latestAnalysis.length = 10;
        }
      });

    this.mongoService.getHighestScoredMessages().subscribe(it => {
      this.topScoredAnalysis = it;
    });
  }

}
