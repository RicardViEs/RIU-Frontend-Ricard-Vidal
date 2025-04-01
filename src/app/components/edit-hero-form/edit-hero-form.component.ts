import { Component, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../../models/hero';
import { UppercaseDirective } from '../../directives/uppercase.directive';

@Component({
  selector: 'app-edit-hero-form',
  imports: [ReactiveFormsModule, UppercaseDirective],
  templateUrl: './edit-hero-form.component.html',
  styleUrl: './edit-hero-form.component.scss'
})
export class EditHeroFormComponent {

  heroService = inject(HeroService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  heroId?: string;

  heroForm = new FormGroup({    
    name: new FormControl<string | null>('', Validators.required),    
    description: new FormControl<string | null>('', Validators.required),  
    superPower: new FormControl<string | null>('', Validators.required)  
  });

  updateHero() {
    const params = this.activatedRoute.snapshot.params;
    
    if( Object.keys( params ).length > 0 ){
      const { id } = params;
      this.heroId = id;
    }

    if (this.heroForm.valid && this.heroForm.value.name 
      && this.heroForm.value.description && this.heroForm.value.superPower
      && this.heroId) {
      this.heroService.updateHero({
        'id': this.heroId,
        'name': this.heroForm.value.name,
        'description': this.heroForm.value.description,
        'superPower': this.heroForm.value.superPower
      }).subscribe((value) => {
        this.router.navigate(['heroes'])
      })
    }

  }
  
  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    
    if( Object.keys( params ).length > 0 ){
      const { id } = params;
      this.heroId = id;
    }
    if (this.heroId) {
      this.heroService.getHeroById(this.heroId).subscribe((hero: Hero | undefined) => {
        if (hero) {
          this.heroForm.patchValue({
          'name': hero.name,
          'description': hero.description,
          'superPower': hero.superPower
        });
        }
    })
    }
  
  }

}
