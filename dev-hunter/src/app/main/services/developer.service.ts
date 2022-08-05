import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {

    private url = `${environment.apiUrl}/developers`;

    constructor(private http: HttpClient) { }

}