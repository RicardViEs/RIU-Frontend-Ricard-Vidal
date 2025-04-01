import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { UppercaseDirective } from '../../directives/uppercase.directive';

@Component({
  selector: 'app-add-hero-form',
  imports: [ReactiveFormsModule, UppercaseDirective, CommonModule, NgIf],
  templateUrl: './add-hero-form.component.html',
  styleUrl: './add-hero-form.component.scss'
})
export class AddHeroFormComponent {

  heroService = inject(HeroService);
  router = inject(Router);

  heroForm = new FormGroup({    
    name: new FormControl<string | null>('', Validators.required),    
    description: new FormControl<string | null>('', Validators.required),  
    superPower: new FormControl<string | null>('', Validators.required)  
  });

  addHero() {
    if (this.heroForm.valid && this.heroForm.value.name 
      && this.heroForm.value.description && this.heroForm.value.superPower) {
      this.heroService.addHero(
        this.heroForm.value.name,
        this.heroForm.value.description,
        this.heroForm.value.superPower
      ).subscribe((value) => {
        this.router.navigate(['heroes'])
      })
    }
   
  }
}
