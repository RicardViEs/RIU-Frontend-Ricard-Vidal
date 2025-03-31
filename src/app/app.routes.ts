import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddHeroFormComponent } from './components/add-hero-form/add-hero-form.component';
import { EditHeroFormComponent } from './components/edit-hero-form/edit-hero-form.component';


export const routes: Routes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full'},
    { path: 'heroes', component: DashboardComponent},
    { path: 'heroes/create', component: AddHeroFormComponent},
    { path: 'heroes/edit/:id', component: EditHeroFormComponent}
];