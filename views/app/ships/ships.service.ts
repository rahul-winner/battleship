import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ShipService {
    constructor(private http: Http) {

    }

    hitLocation(coordinate: string): Observable<any> {
        return this.http.get('/api/hit?coordinate=' + coordinate).map((res: Response) => {
            return res.json();
        });
    }

    startNew(): Observable<any> {
        return this.http.get('/api/new').map(res => {
            return res.json();
        })
    }

    looseGameAndGetShips(): Observable<any> {
        return this.http.get('/api/loose').map(res => {
            return res.json();
        })
    }
}
