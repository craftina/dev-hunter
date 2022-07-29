import { Injectable } from "@angular/core";
import { AuthResponse } from "../interfaces/authResponse.interface";

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    storeUserData(user: AuthResponse): void {
        localStorage.setItem('loggedUser', JSON.stringify(user));
    }

}