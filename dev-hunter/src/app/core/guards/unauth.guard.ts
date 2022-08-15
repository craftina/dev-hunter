import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UnauthGuard implements CanLoad {

    constructor(private router: Router) { }

    canLoad(): boolean {
        const token = localStorage.getItem('accessToken');
        if (token) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}