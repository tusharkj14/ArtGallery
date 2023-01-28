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
  urlEncodeQuery = (q: { query: { bool: { must: ({ term: { is_public_domain: boolean; }; match?: undefined; } | { match: { [x: number]: { query: any; }; }; term?: undefined; })[]; }; }; fields: any; limit: any; }) => encodeURIComponent(JSON.stringify(q));

  getUrl(field : string, searchQuery : string){
    const query = this.queryKeywords(field, searchQuery);

    return `${config.INFO_URL}${this.urlEncodeQuery(query)}`;
  }

  async fetchUrl(url: string){
    const init = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'AIC-User-Agent' : `${config.REQUEST_HEADER_PROJECT_INFO}`
      },
    }
    let tempdata = await fetch(url, init).then(response => response.json());
    // this.dataSend of this.artworks;
    this.dataSend.next(tempdata);

    // console.log(tempdata);
  }

  getImageUrl(identifier: string, small : boolean){
    return `${config.IMAGE_URL}${identifier}${small?config.SMALL_IMAGE_PART_URL:config.LARGE_IMAGE_PART_URL}`;
  }

  sendData() :Observable<keyable>{
    return this.dataSend;
  }
}
