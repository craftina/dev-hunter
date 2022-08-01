import { Injectable } from "@angular/core";
import { AuthResponse } from "../interfaces/authResponse.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    public storageSubject: BehaviorSubject<AuthResponse> = new BehaviorSubject(this.getUserFromStorage());

    storeUserData(user: AuthResponse): void {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.storageSubject.next(user);
    }
    
    getUserFromStorage(): AuthResponse {
        return JSON.parse(localStorage.getItem('loggedUser')!);
    }
    
    clearUser(): void{
        localStorage.clear();
    }

}