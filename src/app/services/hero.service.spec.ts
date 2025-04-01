import { TestBed,inject } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { HeroService } from './hero.service';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

describe('HeroService', () => {
  let heroService: HeroService;
  let url = '/assets/heroes.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), HeroService]
    });
    heroService = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should get heroes', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {
      const mockHeroes = [
        {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'},
        {id: '2', name: 'Strengthy', description: 'A hero who is super strong', superPower: 'superStrength'},
        {id: '3', name: 'The Smarty', description: 'A hero who is super smart', superPower: 'superSmart'},
        {id: '4', name: 'Multitron', description: 'A hero with multiple super powers', superPower: 'superStrength'},
      ];

      heroService.getHeroes().subscribe((event: Observable<Hero[]>) => {
        event.subscribe((heroes: Hero[]) => {
          expect(heroes).toEqual(mockHeroes);
          expect(heroes.length).toEqual(4);
        }) 
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockHeroes);

      httpMock.verify();
    }
  ));

  it('should get hero by id', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {
      const mockHero = {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'};

      heroService.getHeroById('1').subscribe((hero: Hero | undefined) => {
        expect(hero).toEqual(mockHero);
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockHero);

      httpMock.verify();
    }
  ));

  it('should get undefined', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {
      const mockHero = {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'};

      heroService.getHeroById('999').subscribe((hero: Hero | undefined) => {
        expect(hero).toBeUndefined();
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockHero);

      httpMock.verify();
    }
  ));


  it('should update hero', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {
      const mockHero = {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'supaVision'};

      heroService.updateHero(mockHero).subscribe((heroes: Hero[]) => {
        heroes.forEach((hero: Hero) => {
          if (hero.id === '1') {
            expect(hero.name).toEqual(mockHero.name);
          }
        })
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockHero);

      httpMock.verify();
    }
  ));

  it('should add a new hero', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {

      heroService.addHero('Invisible man', 'A hero who can turn invisible', 'invisibility').subscribe((heroes: Hero[]) => {
        expect(heroes.length).toBe(5);
        heroes.forEach((hero: Hero) => {
          if (hero.id === '5') {
            expect(hero.name).toEqual('Invisible man');
          }
        })
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({name: 'Invisible man', description: 'A hero who can turn invisible', superPower: 'invisibility'});

      httpMock.verify();
    }
  ));

  it('should delete a hero', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {

      heroService.deleteHero('1').subscribe((heroes: Hero[]) => {
        expect(heroes.length).toBe(3);
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('1');

      httpMock.verify();
    }
  ));

  it('should return heros containing strin', inject(
    [HttpTestingController, HeroService],
    (httpMock: HttpTestingController, heroService: HeroService) => {

      heroService.getHeroesContainingStringInName('vis').subscribe((heroes: Hero[]) => {
        expect(heroes.length).toBe(1);
        expect(heroes[0].name).toBe('Vision');
      });

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('1');

      httpMock.verify();
    }
  ));



});
