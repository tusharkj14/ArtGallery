import { Component, OnInit } from '@angular/core';
import { nextTick } from "process";
import { Observable } from "rxjs";
import { ArtworksService } from "../artworks.service";
import { keyable } from "../keyable.interface";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private Aserve : ArtworksService) { }
  public searchWas : String = '';
  public categoryWas : String = '';
  public data : keyable[] = [];
  public isLoading : boolean = false;
  getData(){
    this.Aserve.sendData(true).subscribe(res=>{
      let q = this.Aserve.sendSearchQuery();
      this.categoryWas = q['field'], this.searchWas = q['searchQuery'];
      // console.log(q);
      this.data = res['data'];
    });
  }
  retrieveURL(element : keyable, small:boolean){
    return this.Aserve.getImageUrl(element["image_id"], small);
  }

  routerUrl(element: keyable){
    return `/open/:${element['id']}`;
  }

  ngOnInit(): void {
    this.Aserve.sendLoadStatus().subscribe(res=>{
      this.isLoading = res;
    })
    this.getData();
  }

}

