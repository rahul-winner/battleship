import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShipService } from './ships/ships.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Battleship';

  boardWidth = 10;
  boardHeight = 10;
  shipsData: any;

  private subscriptionsList: Array<Subscription> = [];
  constructor(private shipService: ShipService, private changeDetectionRef: ChangeDetectorRef) {

  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  startNewGame() {
    this.subscriptionsList.push(this.shipService.startNew().subscribe(res => {
      return res;
    }));
  }


  looseGame() {
    this.subscriptionsList.push(this.shipService.looseGameAndGetShips().subscribe(res => {
      this.shipsData = res;
      this.changeDetectionRef.markForCheck();
    }));
  }

  getColor(row, cell) {
    return 'black';
  }
}

export class Cell {
  index: number;
  color: string;
}
