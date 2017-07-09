import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShipService } from './ships/ships.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Find the Ships';

  boardWidth = 10;
  boardHeight = 10;
  shipsData: any;
  readonly = true;

  private subscriptionsList: Array<Subscription> = [];
  constructor(private shipService: ShipService, private changeDetectionRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  startNewGame() {
    this.readonly = true;
    this.subscriptionsList.push(this.shipService.startNew().subscribe(res => {
      this.readonly = false;
      this.shipsData = [];
      return res;
    }));
  }

  looseGame() {
    this.subscriptionsList.push(this.shipService.looseGameAndGetShips().subscribe(res => {
      this.readonly = true;
      this.shipsData = res;
    }));
  }

  getColor(row, cell) {
    return 'black';
  }
}