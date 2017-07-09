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
  private subscriptionsList: Array<Subscription> = [];
  constructor(private shipService: ShipService) {

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
}
