// import { Component, OnInit } from '@angular/core';
// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input() hero?: Hero;
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,                      // private / public = juste pour export autre component ?
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));        // nécessité de transformer en number ???
    // const id = this.route.snapshot.paramMap.get('name');           // ESSAI INFRUCTUEUX
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
