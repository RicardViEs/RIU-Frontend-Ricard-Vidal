import { Component, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-management',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './hero-management.component.html',
  styleUrl: './hero-management.component.scss'
})
export class HeroManagementComponent {

  heroService = inject(HeroService);

  searchHeroForm = new FormGroup({    
    str: new FormControl<string | null>('')
  });

  searchHero(event: KeyboardEvent) {
      this.heroService.getHeroesContainingStringInName(
        this.searchHeroForm.value.str?.toLowerCase())   
  }


}
