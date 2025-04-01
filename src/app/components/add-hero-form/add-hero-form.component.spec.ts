import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroFormComponent } from './add-hero-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';

describe('AddHeroFormComponent', () => {
  let component: AddHeroFormComponent;
  let fixture: ComponentFixture<AddHeroFormComponent>;
  let router: Router;

  let heroServiceSpy = jasmine.createSpyObj('HeroService', ['addHero']);
  heroServiceSpy.addHero.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: HeroService, useValue: heroServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AddHeroFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Add a new hero');
  });

  it('should require all fields', () => {
    component.heroForm.setValue({
      "name": "HeroName", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    });

    expect(component.heroForm.valid).toEqual(true);
  });

  it('should require all fields fails', () => {
    component.heroForm.setValue({
      "name": "", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    });

    expect(component.heroForm.valid).toEqual(false);
  });

  it('should allow user to add hero', () => {
    const formData = {
      "name": "HeroName", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    };
    component.heroForm.setValue(formData);
    component.addHero();

    expect(heroServiceSpy.addHero).toHaveBeenCalledWith(formData.name, formData.description, formData.superPower);
  })

  it('should allow user to add hero on click', () => {
    const formData = {
      "name": "HeroName", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    };
    component.heroForm.setValue(formData);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    button?.click();

    fixture.detectChanges();

    expect(heroServiceSpy.addHero).toHaveBeenCalledWith(formData.name, formData.description, formData.superPower);
  })

  it('should not allow user to add hero on click', () => {
    const formData = {
      "name": "", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    };
    component.heroForm.setValue(formData);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    button?.click();

    fixture.detectChanges();

    expect(heroServiceSpy.addHero).not.toHaveBeenCalledWith(formData.name, formData.description, formData.superPower);
  })

});
