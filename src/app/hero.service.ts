import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MessageService } from "./message.service";
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable()
export class HeroService {

  private heroesURL = 'api/heroes';
  

  constructor(private http:HttpClient,private messageService:MessageService) { }

  private errorHandler<T>(operation = "Operation", result?:T){
    return (error:any):Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getHeroes():Observable<Hero[]>{
    this.messageService.add("HeroService has fetched the heroes correctly!");
    return this.http.get<Hero[]>(this.heroesURL)
      .pipe(
        tap(heroes => this.log(`All Heroes fetched!`)),
        catchError(this.errorHandler('getHeroes',[]))
      );
  }
  getHero(id:number):Observable<Hero>{
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=>this.log(`The hero ${id} was fetched propertly`)),
        catchError(this.errorHandler<Hero>(`getHero with id=${id}`))
      );
  }
  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesURL,hero,httpOptions)
      .pipe(

      );
  }
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesURL,hero,httpOptions)
      .pipe(
        tap((hero:Hero)=>this.log(`The Hero ${hero.id} was created succesfully!`)),
        catchError(this.errorHandler<Hero>("addHero"))
      );
  }
  deleteHero(hero:Hero | number ):Observable<Hero>{
    const id = typeof hero==='number'?hero:hero.id;
    const url = `${this.heroesURL}/${id}`
    return this.http.delete<Hero>(url,httpOptions)
      .pipe(
        tap(_=>this.log(`The hero with the id '${id}' was deleted`)),
        catchError(this.errorHandler<Hero>("deleteHero"))
      );
  }
  searchHeroes(term:string):Observable<Hero[]>{
    if (!term.trim()) { //si viene vacio
      return;
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
      .pipe(
        tap(_=>this.log(`Found heroes matching term '${term}'`)),
        catchError(this.errorHandler<Hero[]>("searchHeroes",[]))
      );
  }
  log(message:string){
    this.messageService.add('HeroService: '+message);
  }
  
}
