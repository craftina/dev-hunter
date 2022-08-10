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
        return this.http.get<Hiring[]>(this.url);
    }

}