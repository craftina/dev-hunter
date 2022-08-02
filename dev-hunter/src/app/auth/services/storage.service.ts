import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storageSubject: BehaviorSubject<string> = new BehaviorSubject(this.getUserFromStorage());
    getAccessTokenSubject$(): Observable<string> {
        return this.storageSubject.asObservable();
    }

    storeUserData(accessToken: string): void {
        localStorage.setItem('accessToken', accessToken);
        this.storageSubject.next(accessToken);
    }

    getUserFromStorage(): string {
        return localStorage.getItem('accessToken')!;
    }

    clearUser(): void {
        localStorage.clear();
    }
}