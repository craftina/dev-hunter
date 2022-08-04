import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Technology } from "../interfaces/technology.interface";

@Injectable({
    providedIn: 'root'
})
export class TechnologyService {

    private url = `${environment.apiUrl}/technologies`;

    constructor(private http: HttpClient) { }

    getAllTechnologies$(): Observable<Technology[]> {
        return this.http.get<Technology[]>(this.url);
    }

    getTechnologyById$(id: number): Observable<Technology> {
        return this.http.get<Technology>(`${this.url}/${id}`);
    }

    saveTechnology$(technology: Technology): Observable<Technology> {
        if (technology.id) {
            return this.editTechnology$(technology);
        } else {
            return this.createTechnology$(technology);
        }
    }

    createTechnology$(technology: Technology): Observable<Technology> {
        return this.http.post<Technology>(this.url, technology);
    }

    editTechnology$(technology: Technology): Observable<Technology> {
        return this.http.put<Technology>(`${this.url}/${technology.id}`, technology);
    }

    deleteTechnology$(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}