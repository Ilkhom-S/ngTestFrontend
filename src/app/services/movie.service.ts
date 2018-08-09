import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Movie } from '../Movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: Http) {}
  private imdbUrl = 'http://www.omdbapi.com';
  private apiKey = '5751fd6b';
  public totalRows: number;
  // Search movies from imdb
  findMovies(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0
  ): Observable<Movie[]> {
    return this.http
      .get(
        this.imdbUrl +
          '/?apikey=' +
          this.apiKey +
          '&s=' +
          filter +
          '&page=' +
          pageNumber++
      )
      .map(this.extractData)
      .catch(this.handleError);
  }
  getTotalRows() {
    return this.totalRows;
  }

  getMovie(id: string): Promise<Movie> {
    return this.http
      .get(this.imdbUrl + '/?apikey=' + this.apiKey + '&i=' + id)
      .toPromise()
      .then((res: Response) => res.json() as Movie)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    const searchData = body['Search'];
    this.totalRows = body['totalResults'];
    return searchData;
  }
  /* getCategories() {
    return this.categories;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  } */

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
