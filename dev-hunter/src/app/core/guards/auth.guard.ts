import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanLoad {

    constructor(private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            this.router.navigate(['auth', 'login']);
            return false;
        }
        return true;
    }
}