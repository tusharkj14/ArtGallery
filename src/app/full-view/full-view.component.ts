import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location as CommonLocation } from '@angular/common';
import { ArtworksService } from '../artworks.service';
import { keyable } from '../keyable.interface';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css'],
  standalone: false,
})
export class FullViewComponent {
  private artworks = inject(ArtworksService);
  private route = inject(ActivatedRoute);
  private location = inject(CommonLocation);

  imageUrl = '';
  el: keyable = {};
  isLoading = true;
  imageLoaded = false;

  ngOnInit() {
    this.artworks.sendLoadStatus().subscribe((v) => (this.isLoading = v));
    this.artworks.sendData(false).subscribe((obj: keyable) => {
      if (!obj) return;
      this.el = obj;
      this.imageUrl = obj['primaryImage'] || obj['primaryImageSmall'] || '';
      this.imageLoaded = false;
    });
    this.route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('id');
      if (id) this.artworks.fetchObject(id);
    });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  goBack() {
    this.location.back();
  }

  field(name: string): string {
    return (this.el[name] ?? '').toString().trim();
  }

  get origin(): string {
    return this.field('country') || this.field('culture') || this.field('region') || '';
  }

  get hasTags(): boolean {
    return Array.isArray(this.el['tags']) && this.el['tags'].length > 0;
  }
}
