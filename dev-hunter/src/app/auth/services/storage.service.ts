import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storageSubject: BehaviorSubject<string> = new BehaviorSubject(this.getAccessToken());
    getAccessTokenSubject$(): Observable<string> {
        return this.storageSubject.asObservable();
    }

    storeAccessToken(accessToken: string): void {
        localStorage.setItem('accessToken', accessToken);
        this.storageSubject.next(accessToken);
    }

    getAccessToken(): string {
        return localStorage.getItem('accessToken')!;
    }

    removeAccessToken(): void {
        localStorage.removeItem('accessToken');
    }
}