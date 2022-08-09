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

    getAllDevelopers$(): Observable<Developer[]> {
        return this.http.get<Developer[]>(`${this.url}?_expand=location&_expand=technology`);
    }

    getDeveloperById$(id: number): Observable<Developer> {
        return this.http.get<Developer>(`${this.url}/${id}?_expand=location&_expand=technology`);
    }
    
    saveDeveloper$(developer: Developer): Observable<Developer> {
        if (developer.id) {
            return this.editDeveloper$(developer);
        } else {
            return this.createDeveloper$(developer);
        }
    }

    createDeveloper$(developer: Developer): Observable<Developer> {
        return this.http.post<Developer>(this.url, developer);
    }

    editDeveloper$(developer: Developer): Observable<Developer> {
        return this.http.put<Developer>(`${this.url}/${developer.id}`, developer);
    }

    deleteDeveloper$(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}