import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(private router: Router) { }

    canLoad(): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            this.router.navigate(['auth', 'login']);
            return false;
        }
        return true;
    }
}