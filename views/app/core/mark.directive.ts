import { Directive, HostListener, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShipService } from '../ships/ships.service';
import { Cell } from '../ships/cell.model';

@Directive({
    selector: '[appMark]'
})
export class MarkDirective implements OnChanges {

    @Input() row: string;
    @Input() col: string;
    @Input() shipsKnownLocations: Array<any> = [];
    constructor(private el: ElementRef, private shipService: ShipService) {
        const cellLoc = this.row + this.col;

        this.el.nativeElement.style.backgroundColor = 'grey';

        const cell = new Cell(cellLoc, 'grey');
        this.shipService.addCell(cell);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['shipsKnownLocations'] && this.shipsKnownLocations) {
            const changesInShipsKnownLocations = changes['shipsKnownLocations'];

            const cellLoc = this.row + this.col;
            let isShipPresent = false;
            this.shipsKnownLocations.forEach(loc => {
                if (loc === cellLoc && !isShipPresent) {
                    isShipPresent = true;
                }
            });
            if (isShipPresent) {
                this.el.nativeElement.style.backgroundColor = 'yellow';
            } else {
                this.el.nativeElement.style.backgroundColor = 'grey';
            }
        }
    }

    @HostListener('click', ['$event']) onMouseClick() {
        this.shipService.hitLocation(this.row + this.col).subscribe(res => {
            const hitOrMiss = res['hitOrMiss'];
            if (hitOrMiss) {
                this.highlight('blue');
            } else {
                this.highlight('red');
            }
        });
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}
