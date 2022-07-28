import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    storeUserData(user: User): void {
        delete user.password;
        localStorage.setItem('loggedUser', JSON.stringify(user));
    }

}