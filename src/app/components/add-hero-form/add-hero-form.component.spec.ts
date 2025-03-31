import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroFormComponent } from './add-hero-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HeroService } from '../../services/hero.service';

describe('AddHeroFormComponent', () => {
  let component: AddHeroFormComponent;
  let fixture: ComponentFixture<AddHeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), HeroService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
