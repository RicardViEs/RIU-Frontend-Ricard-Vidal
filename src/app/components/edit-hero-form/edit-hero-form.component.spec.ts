import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroFormComponent } from './edit-hero-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';
import { routes } from '../../app.routes';

describe('EditHeroFormComponent', () => {
  let component: EditHeroFormComponent;
  let fixture: ComponentFixture<EditHeroFormComponent>;

  let heroServiceSpy = jasmine.createSpyObj('HeroService', ['updateHero']);
  heroServiceSpy.updateHero.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        HeroService, 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(EditHeroFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Edit Hero');
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

  it('should not allow user to update hero', () => {
    const formData = {
      "name": "", 
      "description": "HeroDescription", 
      "superPower": "HeroSuperPower"
    };
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    component.heroId = '1';
    component.heroForm.setValue(formData);   
    button?.click();
    fixture.detectChanges();

    expect(heroServiceSpy.updateHero).not.toHaveBeenCalledWith(component.heroId, formData.name, formData.description, formData.superPower);
  })

});
