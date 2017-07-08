import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Battleship';

  selectCell(row, col) {
    console.log('cell = ' + row + col);
  }
}
