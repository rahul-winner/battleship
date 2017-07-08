import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ShipService {
    constructor(private http: Http) {

    }

    hitLocation(coordinate: string): Observable<boolean> {
        return this.http.get('/api').map(res => {
            return true;
        });
    }
}
