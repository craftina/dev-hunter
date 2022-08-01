import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
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
        path: '**',
        redirectTo: 'home'
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule {

}