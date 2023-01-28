import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import * as config from "../config"

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor() { }
  @Input() imageurl : string = '';
  @Input() artistName: string = '';
  @Input() title : string = '';
  ngOnInit(): void {
    // //console.log(this.imageurl);

  }

}
