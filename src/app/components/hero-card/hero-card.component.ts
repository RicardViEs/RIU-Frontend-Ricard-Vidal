import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatCardModule} from '@angular/material/card';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  
  heroService = inject(HeroService);
  router = inject(Router);

  hero = input<Hero>();  

  deleteHero(id: string | undefined) {
    this.heroService.deleteHero(id);
  }

  editHero(id: string | undefined) {
    this.router.navigate(['heroes/edit/' + id]);
  }
}
