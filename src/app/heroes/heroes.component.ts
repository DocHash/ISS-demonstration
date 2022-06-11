import { Component, OnInit } from '@angular/core';
// import { HEROES } from 'src/app/mock-heroes';
import { Hero } from 'src/app/hero';

import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  // selectedHero?: Hero;                               onSelect non nécessaire avec routing

  // constructor(private heroService: HeroService) {}
  constructor(private heroService: HeroService) { }
  // constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);     // préciser le fctionnement du paramètre de la méthode .subscribe()
  }                                                     // sens des arguments passés de cette manière ?

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  
  // onSelect(hero: Hero): void {                       onSelect non nécessaire avec routing
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

}
