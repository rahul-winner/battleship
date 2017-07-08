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

  selectCell(row, col) {
    const coordinate: string = row + col;
    console.log('cell = ' + row + col);
    this.subscriptionsList.push(this.shipService.hitLocation(coordinate).subscribe((res) => {
      console.log(res);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
