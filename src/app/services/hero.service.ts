import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  httpService = inject(HttpClient);
  private readonly url = '/assets/heroes.json';

  private readonly heroes$ = new BehaviorSubject<Hero[]>([
    {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'},
    {id: '2', name: 'Strengthy', description: 'A hero who is super strong', superPower: 'superStrength'},
    {id: '3', name: 'The Smarty', description: 'A hero who is super smart', superPower: 'superSmart'},
    {id: '4', name: 'Multitron', description: 'A hero with multiple super powers', superPower: 'superStrength'},
  ]);

  private readonly resetHeroes$ = new BehaviorSubject<Hero[]>([
    {id: '1', name: 'Vision', description: 'A hero who can see a lot', superPower: 'superVision'},
    {id: '2', name: 'Strengthy', description: 'A hero who is super strong', superPower: 'superStrength'},
    {id: '3', name: 'The Smarty', description: 'A hero who is super smart', superPower: 'superSmart'},
    {id: '4', name: 'Multitron', description: 'A hero with multiple super powers', superPower: 'superStrength'},
  ]);

  getHeroes(){
    return this.httpService.get<Hero[]>(this.url, {}).pipe(
      map(() => this.heroes$.asObservable())
    )
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpService.get<Hero>(this.url).pipe(
      map(()=> {
        const heroe = this.heroes$.getValue().find(( element ) => element.id === id)
        return heroe;
      })
    );
  }

  updateHero(hero: Hero): Observable<Hero[]>{
    return this.httpService.put<Hero[]>(this.url, hero).pipe(
      map(()=> {
        const currentState = this.heroes$.getValue();
        const newState = currentState.map(( item ) => {
          return (item.id === hero.id) ? hero : item
        })
        this.heroes$.next(newState);
        return newState;
      })
    )
  }

  addHeroe(name: string, description: string, superPower: string): Observable<Hero[]> {
    const currentState = this.heroes$.getValue();
    const id = currentState.length + 1;

    const newHero: Hero = {
      id: String(id),
      name: name,
      description: description,
      superPower: superPower
    }

    return this.httpService.post<Hero[]>(this.url, newHero).pipe(
      map(() => {
        this.heroes$.next([...currentState, ...[newHero]]);
        this.resetHeroes$.next([...currentState, ...[newHero]]);
        return this.heroes$.getValue();
      })
    );    
    
  }

  deleteHero(id: string | undefined) {
    const currentState = this.heroes$.getValue();
    const newState = currentState.filter(( item ) => item.id !== id);
    this.heroes$.next( newState );
    this.resetHeroes$.next( newState );
    return this.httpService.delete<string>(this.url).pipe(
      map(() => {
        return this.heroes$.getValue();
      })
    )
  }

  getHeroesContainingStringInName(str: string | null | undefined) {
    if (str && str.length >= 1) {
      this.heroes$.next(this.resetHeroes$.getValue());
      const newState = this.heroes$.getValue().filter(( element ) => (element.name.toLowerCase()).includes(str));
      this.heroes$.next( newState );
    } else {
      this.heroes$.next(this.resetHeroes$.getValue());
    }
    return this.httpService.get<string>(this.url).pipe(
      map(() => {
        return this.heroes$.getValue();
      })
    )
      
  }

}
