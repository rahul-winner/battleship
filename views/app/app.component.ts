import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShipService } from './ships/ships.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Battleship';
  hit = true;

  private subscriptionsList: Array<Subscription> = [];
  constructor(private shipService: ShipService) {

  }

  isHitOrMiss(row, col) {
    this.hit = !this.hit;
    return this.hit;
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
