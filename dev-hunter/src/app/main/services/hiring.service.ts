import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Hiring } from "../interfaces/hiring.interface";

@Injectable({
    providedIn: 'root'
})
export class HiringService {

    private url = `${environment.apiUrl}/hirings`;

    constructor(private http: HttpClient) {
    }

    getAllHirings$(): Observable<Hiring[]> {
        return this.http.get<Hiring[]>(`${this.url}?_expand=developer`);
    }

    createHiring$(hiring: Hiring): Observable<Hiring> {
        return this.http.post<Hiring>(this.url, hiring)
    }

    editHiring$(hiring: Hiring): Observable<Hiring> {
        const selectedHiring = { ...hiring };
        delete selectedHiring.developer;
        return this.http.put<Hiring>(`${this.url}/${hiring.id}`, selectedHiring)
    }

    deleteHiring$(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`)
    }
}