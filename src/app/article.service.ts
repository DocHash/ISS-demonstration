import { Injectable } from '@angular/core';
import { Article } from './article';
import { ARTICLES } from './mock-articles';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesUrl = 'api/articles';                                         // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead                       // TODO: send the error to remote logging infrastructure

      this.log(`${operation} failed: ${error.message}`);                    // TODO: better job of transforming error for user consumption

      return of(result as T);                                               // Let the app keep running by returning an empty result.
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  getArticles(): Observable<Article[]> {                                      /** GET articles from the server */
    return this.http.get<Article[]>(this.articlesUrl)
      .pipe(
        tap(_ => this.log('fetched articles')),
        catchError(this.handleError<Article[]>('getArticles', []))
      );
  }
  
  getArticle(id: number): Observable<Article> {                                /** GET article by id. */
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  updateArticle(article: Article): Observable<any> {                              /** PUT: update the article on the server */
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  addArticle(article: Article): Observable<Article> {                             /** POST: add a new article to the server */
    return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
      tap((newArticle: Article) => this.log(`added article w/ id=${newArticle.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle(id: number): Observable<Article> {                             /** DELETE: delete the article from the server */
    const url = `${this.articlesUrl}/${id}`;

    return this.http.delete<Article>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  searchArticles(term: string): Observable<Article[]> {                         /* GET articles whose name contains search term */
    if (!term.trim()) {
      return of([]);                                                          // if not search term, return empty article array.
    }
    return this.http.get<Article[]>(`${this.articlesUrl}/?title=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found articles matching "${term}"`) :
        this.log(`no article matching "${term}"`)),
      catchError(this.handleError<Article[]>('searchArticles', []))
    );
  }

  private log(message: string) {                                            /** Log an ArticleService message with the MessageService */
    this.messageService.add(`ArticleService: ${message}`);
  }
  
}
