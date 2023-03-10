import { Injectable } from '@angular/core';
import * as config from "./config"
import { Observable, of, ReplaySubject, shareReplay, Subject } from "rxjs";
import { keyable } from "./keyable.interface";

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  public artworks !: keyable;
  public dataSend = new ReplaySubject<keyable>(1) ;
  public imageDataSend = new Subject<keyable>() ;
  public loadSpinner = new Subject<boolean>();
  public searchQuery: keyable = {};
  constructor() { }

  queryKeywords = function (categoryField: any, keywords: any) {
    return {
      query: {
        bool: {
          must: [
            {
              term: {
                is_public_domain: true,
              },
            },
            {
              match: {
                [categoryField]: {
                  query: keywords,
                },
              },
            },
          ],
        },
      },
      fields: config.ARTWORK_FIELDS,
      limit: config.RESULTS_LIMIT,
    };
  };
  urlEncodeQuery = (q: keyable) => encodeURIComponent(JSON.stringify(q));

  getUrl(q: keyable, results: boolean){
    // let query!any;
    if (results){
    this.searchQuery = q;

      let query = this.queryKeywords(config.CATEGORY_FIELD[q['field']], q['searchQuery']);
      return `${config.INFO_URL}${this.urlEncodeQuery(query)}`;
    }

    return `${config.IMAGE_API}${q['id']}`;
  }

  sendSearchQuery(){
    return this.searchQuery;
  }

  async fetchUrl(url: string, results: boolean){
    this.loadSpinner.next(true);
    const init = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'AIC-User-Agent' : `${config.REQUEST_HEADER_PROJECT_INFO}`
      },
    }
    let tempdata: keyable = await fetch(url, init).then(response => response.json());
    // this.dataSend of this.artworks;
    if (results){
      this.dataSend.next(tempdata);
    }
    else{
      this.imageDataSend.next(tempdata);
    }

    this.loadSpinner.next(false);
    // //console.log(tempdata);
  }

  getImageUrl(identifier: string, small : boolean){
    return `${config.IMAGE_URL}${identifier}${small?config.SMALL_IMAGE_PART_URL:config.LARGE_IMAGE_PART_URL}`;
  }

  sendData(results: boolean) :Observable<keyable>{
    // this.loadSpinner.next(true);
    return results? this.dataSend : this.imageDataSend;
  }

  sendLoadStatus(): Observable<boolean>{
    return this.loadSpinner;
  }
}
