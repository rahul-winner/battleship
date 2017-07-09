import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cell } from './cell.model';

@Injectable()
export class ShipService {

    boardCells: Array<Cell> = [];

    constructor(private http: Http) {

    }

    addCell(cell: Cell) {
        this.boardCells.push(cell);
    }

    hitLocation(coordinate: string): Observable<any> {
        return this.http.get('/api/hit?coordinate=' + coordinate).map((res: Response) => {
            return res.json();
        });
    }

    startNew(): Observable<any> {
        return this.http.get('/api/new').map(res => {
            this.boardCells = [];
            return res.json();
        })
    }

    looseGameAndGetShips(): Observable<any> {
        return this.http.get('/api/loose').map(res => {
            return res.json();
        })
    }
}
