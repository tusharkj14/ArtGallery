import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl} from '@angular/forms';
import { MatRadioChange } from "@angular/material/radio";
import { ArtworksService } from "../artworks.service";
import { keyable } from "../keyable.interface";

@Component({
  selector: 'app-search-side',
  templateUrl: './search-side.component.html',
  styleUrls: ['./search-side.component.css']
})
export class SearchSideComponent implements OnInit {
  public radios : any = "Artwork";
  public searchInput: string = "";
  constructor(private Aserve : ArtworksService) { }


  onSubmit(form: NgForm) {
    if (form.invalid || this.searchInput.length == 0) {
      return;
    }

    let field = this.radios, searchQuery = form.value.search;

    let q : keyable = {
      'field' : field,
      'searchQuery' : searchQuery
    }

    const url = this.Aserve.getUrl(q, true);
    //console.log(url);

    this.Aserve.fetchUrl(url, true);
  }

  radioChange(e:MatRadioChange){
    this.radios = e.value;
  }
  ngOnInit(): void {
    let q : keyable = this.Aserve.sendSearchQuery();
    if (Object.keys(q).length){
      this.radios = q['field'];
      this.searchInput = q['searchQuery'];
      // console.log(q);
    }
  }

}
