import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: [ './article-search.component.css' ]
})
export class ArticleSearchComponent implements OnInit {
  articles$!: Observable<Article[]>;
  private searchTerms = new Subject<string>();

  constructor(private articleService: ArticleService) {}

  search(term: string): void {                                              // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.articles$ = this.searchTerms.pipe(
      debounceTime(300),                                                      // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(),                                                 // ignore new term if same as previous term
      switchMap((term: string) => this.articleService.searchArticles(term)),     // switch to new search observable each time the term changes
    );
  }

}
