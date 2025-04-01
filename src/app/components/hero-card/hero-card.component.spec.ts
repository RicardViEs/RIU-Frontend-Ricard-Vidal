import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardComponent } from './hero-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';
import { routes } from '../../app.routes';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let router: Router;

  let heroServiceSpy = jasmine.createSpyObj('HeroService', ['deleteHero']);
  heroServiceSpy.deleteHero.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {
          provide: HeroService, useValue: heroServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
		
    fixture.detectChanges();

    const expectedHero = {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'};
    fixture.componentRef.setInput('hero', expectedHero);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button edit text', () => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button')[0]?.textContent).toContain('Edit Hero');
  });

  it('should render button delete text', () => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button')[1]?.textContent).toContain('Delete Hero');
  });

  it('should allow go to edit hero route', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const routerSpy = spyOn(router, 'navigate');
    buttons[0].click();
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['heroes/edit/1']);
  })
});
