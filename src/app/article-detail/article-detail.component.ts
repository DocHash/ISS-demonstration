import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }
  
  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id)
      .subscribe(articleChosen => this.article = articleChosen);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.article) {
      this.articleService.updateArticle(this.article)
        .subscribe(() => this.goBack());
    }
  }

}
