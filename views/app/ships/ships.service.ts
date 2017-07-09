import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cell } from './cell.model';

@Injectable()
export class ShipService {

    private readonly = true;
    private win = false;

    constructor(private http: Http) {

    }

    isReadOnly(): boolean {
        return this.readonly;
    }

    startNew(): Observable<any> {
        return this.http.get('/api/new').map(res => {
            this.readonly = false;
            const gameResponse = res.json();
            const gameId = gameResponse.gameId;
            sessionStorage.setItem('battleship', gameId);
            return gameResponse;
        })
    }

    hitLocation(coordinate: string): Observable<any> {
        const gameId = sessionStorage.getItem('battleship');
        return this.http.get('/api/hit?coordinate=' + coordinate + '&gameId=' + gameId).map((res: Response) => {
            return res.json();
        });
    }

    getWonFlag() {
        return this.win;
    }

    setWonFlag(flag) {
        this.win = flag;
    }

    looseGameAndGetShips(): Observable<any> {
        const gameId = sessionStorage.getItem('battleship');
        return this.http.get('/api/loose?gameId=' + gameId).map(res => {
            this.readonly = true;
            sessionStorage.removeItem('battleship');
            return res.json();
        })
    }
}
