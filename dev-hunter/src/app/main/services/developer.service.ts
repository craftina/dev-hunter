import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Developer } from "../interfaces/developer.interface";

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {

    private url = `${environment.apiUrl}/developers`;

    private queryParams = new HttpParams()
    .append("_expand", "location")
    .append("_expand", "technology"); 

    constructor(private http: HttpClient) { 
    }

    getAllDevelopers$(): Observable<Developer[]> {
        return this.http.get<Developer[]>(this.url, {params: this.queryParams});
    }

    getDeveloperById$(id: number): Observable<Developer> {
        return this.http.get<Developer>(`${this.url}/${id}`, {params: this.queryParams});
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