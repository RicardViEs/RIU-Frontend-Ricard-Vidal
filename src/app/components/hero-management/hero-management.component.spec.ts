import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroManagementComponent } from './hero-management.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HeroService } from '../../services/hero.service';

describe('HeroManagementComponent', () => {
  let component: HeroManagementComponent;
  let fixture: ComponentFixture<HeroManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroManagementComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), HeroService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
