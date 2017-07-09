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
    @Input() readonly = false;

    private isHit = false;
    private isShot = false;

    constructor(private el: ElementRef, private shipService: ShipService) {
        this.el.nativeElement.style.backgroundColor = 'grey';
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
                if (this.isHit) {
                    this.el.nativeElement.style.backgroundColor = 'green';
                } else {
                    this.el.nativeElement.style.backgroundColor = 'yellow';
                }
            } else {
                if (!this.isShot) {
                    this.isShot = false;
                    this.isHit = false;
                    this.el.nativeElement.style.backgroundColor = 'grey';
                }
            }
        }

        if (changes['readonly'] && !this.readonly) {
            this.el.nativeElement.style.backgroundColor = 'grey';
        }
    }

    @HostListener('click', ['$event']) onMouseClick() {
        if (this.shipService.isReadOnly()) {
            return;
        }
        this.shipService.hitLocation(this.row + this.col).subscribe(res => {
            const hitOrMiss = res['hitOrMiss'];
            this.isShot = true;
            if (hitOrMiss) {
                this.isHit = true;
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
