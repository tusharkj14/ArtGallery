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
  public data : keyable[] = [];
  getData(){
    this.Aserve.sendData(true).subscribe(res=>{
      // //console.log(res['data']);
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
    this.getData();
  }

}

