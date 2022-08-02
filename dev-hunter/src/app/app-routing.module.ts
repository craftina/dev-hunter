import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }