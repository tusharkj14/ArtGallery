import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject, forkJoin } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import * as config from './config';
import { keyable } from './keyable.interface';

interface MetSearchResult {
  total: number;
  objectIDs: number[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  public dataSend = new ReplaySubject<keyable[]>(1);
  public imageDataSend = new Subject<keyable>();
  public loadSpinner = new Subject<boolean>();
  public searchQuery: keyable = {};

  constructor(private http: HttpClient) {}

  sendSearchQuery() {
    return this.searchQuery;
  }

  clear() {
    this.searchQuery = {};
    this.dataSend.next([]);
  }

  search(field: string, query: string) {
    this.searchQuery = { field, searchQuery: query };
    this.loadSpinner.next(true);

    const filterKey = config.CATEGORY_FIELD[field];
    let params = new HttpParams().set('q', query).set('hasImages', '1');
    if (filterKey) {
      params = params.set(filterKey, '1');
    }

    this.http
      .get<MetSearchResult>(config.SEARCH_URL, { params })
      .pipe(
        switchMap((res) => {
          const ids = (res.objectIDs ?? []).slice(0, config.RESULTS_LIMIT);
          if (ids.length === 0) return of([] as keyable[]);
          return forkJoin(
            ids.map((id) =>
              this.http
                .get<keyable>(`${config.OBJECT_URL}${id}`)
                .pipe(catchError(() => of(null)))
            )
          ).pipe(
            switchMap((items) =>
              of(
                items.filter(
                  (item): item is keyable =>
                    !!item && !!item['primaryImageSmall']
                )
              )
            )
          );
        }),
        catchError(() => of([] as keyable[]))
      )
      .subscribe((items) => {
        this.dataSend.next(items);
        this.loadSpinner.next(false);
      });
  }

  fetchObject(id: string | number) {
    this.loadSpinner.next(true);
    this.http
      .get<keyable>(`${config.OBJECT_URL}${id}`)
      .pipe(catchError(() => of(null)))
      .subscribe((obj) => {
        if (obj) this.imageDataSend.next(obj);
        this.loadSpinner.next(false);
      });
  }

  sendData(results: boolean): Observable<any> {
    return results ? this.dataSend : this.imageDataSend;
  }

  sendLoadStatus(): Observable<boolean> {
    return this.loadSpinner;
  }
}
