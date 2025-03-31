import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroFormComponent } from './edit-hero-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HeroService } from '../../services/hero.service';

describe('EditHeroFormComponent', () => {
  let component: EditHeroFormComponent;
  let fixture: ComponentFixture<EditHeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), HeroService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
