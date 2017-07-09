import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShipService } from './ships/ships.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Find the Ships';

  boardWidth = 10;
  boardHeight = 10;
  shipsData: any;
  readonly = false;

  private subscriptionsList: Array<Subscription> = [];
  constructor(private shipService: ShipService, private changeDetectionRef: ChangeDetectorRef) {
    this.readonly = this.shipService.isReadOnly();
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  startNewGame() {
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