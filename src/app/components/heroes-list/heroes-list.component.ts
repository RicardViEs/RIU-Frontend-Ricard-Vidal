import { Component, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { CommonModule, NgFor } from '@angular/common'
import { Observable } from 'rxjs';
import { Hero } from '../../models/hero';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-heroes-list',
  imports: [CommonModule, NgFor, MatPaginatorModule, HeroCardComponent],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent {

  heroService = inject(HeroService);
  heroes$!: Observable<Hero[]>;

  length = 100;
  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions = [2, 4, 8];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes)=> {
      this.heroes$ =  heroes;
      heroes.subscribe(v => {
        this.length = v.length;
      })
    });
  }

}
