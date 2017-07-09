import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { ShipService } from '../ships/ships.service';

@Directive({
    selector: '[appMark]'
})
export class MarkDirective {

    @Input() row: string;
    @Input() col: string;
    constructor(private el: ElementRef, private shipService: ShipService) { }

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
