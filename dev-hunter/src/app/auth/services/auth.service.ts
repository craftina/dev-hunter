import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../interfaces/authResponse.interface";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    login$(data: User): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.url}/login`, data);
    }

    register$(data: User): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/register`, data);
    }
}