import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule {

}