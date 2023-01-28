import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ArtworksService } from "../artworks.service";
import { keyable } from "../keyable.interface";

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent {
  public imageUrl : string = '#';
  constructor(private aserve: ArtworksService, private route: ActivatedRoute){}
  public el !: keyable;
  ngOnInit(){

    this.route.paramMap.subscribe((res : ParamMap)=>{
      if(res.has('id')){
        // //console.log(res.get('id'));
        let id = res.get('id');
        let q : keyable = {'id' : id};
        const url = this.aserve.getUrl(q, false);
        this.aserve.fetchUrl(url, false);

        this.aserve.sendData(false).subscribe(arr=>{
          //console.log(arr);
          // let idx = arr['data'].findIndex((obj: keyable)=> obj['id']==id);
          this.el = arr['data'];
          //console.log(this.el);
          this.imageUrl = this.aserve.getImageUrl(this.el['image_id'] ,false);
        })
      }
    });
  }

}
