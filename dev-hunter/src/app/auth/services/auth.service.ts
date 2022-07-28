import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../interfaces/login.interface";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private url = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    login$(data: Login): Observable<User> {
        return this.http.post<User>(`${this.url}/login`, data);
    }

    register$(data: Login): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/register`, data);
    }

}