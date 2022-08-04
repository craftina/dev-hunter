import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Developer } from "../interfaces/developer.interface";

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {

    private url = `${environment.apiUrl}/developers`;

    constructor(private http: HttpClient) { }

    getDevelopersByLocationId$(locationId: number): Observable<Developer[]> {
        return this.http.get<Developer[]>(`${this.url}/?locationId_like=${locationId}`);
    }

    getDevelopersByTechnologyId$(technologyId: number): Observable<Developer[]> {
        return this.http.get<Developer[]>(`${this.url}/?technologyId_like=${technologyId}`);
    }
}