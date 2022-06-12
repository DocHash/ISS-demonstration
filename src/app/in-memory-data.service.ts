import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 1, title: 'Les protides', authors: 'Jojo le Terrible', abstract: '' },
      { id: 2, title: 'Les glucides', authors: 'Dr. Nice', abstract: '' },
      { id: 3, title: 'Les lipides', authors: 'Bombasto', abstract: '' },
      { id: 4, title: 'ADN', authors: 'Celeritas', abstract: '' },
      { id: 5, title: 'ARN', authors: 'Magneta', abstract: '' },
      { id: 6, title: 'Anticorps', authors: 'RubberMan', abstract: '' },
      { id: 7, title: 'Antigens', authors: 'Dynama', abstract: '' },
      { id: 8, title: 'Virus', authors: 'Dr. IQ', abstract: '' },
      { id: 9, title: 'Bacteria', authors: 'Magma', abstract: '' },
      { id: 10, title: 'Fungi', authors: 'Tornado', abstract: '' }
    ];
    return {articles};
  }

  // Overrides the genId method to ensure that an article always has an id.
  // If the articles array is empty, the method below returns the initial number (11).
  // if the articles array is not empty, the method below returns the highest article id + 1.
  genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 1;
  }

}
