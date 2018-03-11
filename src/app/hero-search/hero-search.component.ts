import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { debounceTime,distinctUntilChanged,switchMap } from "rxjs/operators";
import { Hero } from "../hero.model";
import { HeroService } from "../hero.service";
import { debounce } from 'rxjs/operators/debounce';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})


export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor( private heroService:HeroService) { }

  search(term:string){
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),//espera 300ms despues de presionada la tecla para buscar
      distinctUntilChanged(), //ignora nuevo termino si es igual al ya existente
      switchMap((term:string)=>this.heroService.searchHeroes(term))
    );
  }

  

}