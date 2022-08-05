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
        return this.http.get<Location[]>(`${this.url}?_embed=developers`);
    }

    getLocationById$(id: number): Observable<Location> {
        return this.http.get<Location>(`${this.url}/${id}`);
    }
    
    saveLocation$(location: Location): Observable<Location> {
        if (location.id) {
            return this.editLocation$(location);
        } else {
            return this.createLocation$(location);
        }
    }

    createLocation$(location: Location): Observable<Location> {
        return this.http.post<Location>(this.url, location);
    }

    editLocation$(location: Location): Observable<Location> {
        return this.http.put<Location>(`${this.url}/${location.id}`, location);
    }

    deleteLocation$(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}