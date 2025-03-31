import { Component } from '@angular/core';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';
import { HeroManagementComponent } from '../hero-management/hero-management.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeroManagementComponent, HeroesListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
