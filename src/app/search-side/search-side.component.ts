import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl} from '@angular/forms';
import { MatRadioChange } from "@angular/material/radio";
import { ArtworksService } from "../artworks.service";

@Component({
  selector: 'app-search-side',
  templateUrl: './search-side.component.html',
  styleUrls: ['./search-side.component.css']
})
export class SearchSideComponent implements OnInit {
  public radios : any = "Artwork";
  constructor(private Aserve : ArtworksService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.radios)
    console.log(form.value.search);

    let field = '', searchQuery = form.value.search;
    if (this.radios==='Artwork')  field = 'title';
    else if (this.radios==='Artist')  field = 'artist_title';

    const url = this.Aserve.getUrl(field, searchQuery);
    console.log(url);

    this.Aserve.fetchUrl(url);
  }

  radioChange(e:MatRadioChange){
    this.radios = e.value;
  }
  ngOnInit(): void {
  }

}
