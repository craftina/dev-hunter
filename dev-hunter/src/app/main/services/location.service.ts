import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Location } from "../interfaces/location.interface";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private url = `${environment.apiUrl}/locations`;

    constructor(private http: HttpClient) { }

    getAllLocations$(): Observable<Location[]> {
        return this.http.get<Location[]>(this.url);
    }

    getLocationById$(id: number): Observable<Location> {
        return this.http.get<Location>(`${this.url}/${id}`)
    }

    saveLocation$(location: Location): Observable<Location> {
        if (location.id) {
            console.log('edit');
            return this.editLocation$(location);
        } else {
            console.log('create');
            return this.createLocation$(location);
        }
    }

    createLocation$(location: Location): Observable<Location> {
        return this.http.post<Location>(this.url, location);
    }

    editLocation$(location: Location): Observable<Location> {
        return this.http.put<Location>(`${this.url}/${location.id}`, location);
    }

}