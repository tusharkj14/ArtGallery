import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  standalone: false,
})
export class ListItemComponent {
  @Input() imageurl = '';
  @Input() artistName = '';
  @Input() title = '';
  @Input() date = '';

  loaded = false;

  onLoad() {
    this.loaded = true;
  }
}
