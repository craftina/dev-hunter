import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Location } from "../interfaces/location.interface";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private url = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getAllLocations$(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.url}/locations`);
    }

}