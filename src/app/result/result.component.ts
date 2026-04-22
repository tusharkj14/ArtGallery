import { Component, OnInit, inject } from '@angular/core';
import { ArtworksService } from '../artworks.service';
import { keyable } from '../keyable.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: false,
})
export class ResultComponent implements OnInit {
  private artworks = inject(ArtworksService);

  searchWas = '';
  categoryWas: 'Artwork' | 'Artist' | '' = '';
  data: keyable[] = [];
  isLoading = false;
  hasSearched = false;

  skeletons = Array.from({ length: 12 });

  ngOnInit(): void {
    this.artworks.sendLoadStatus().subscribe((v) => (this.isLoading = v));
    this.artworks.sendData(true).subscribe((res: keyable[]) => {
      const q = this.artworks.sendSearchQuery();
      this.categoryWas = q['field'] ?? '';
      this.searchWas = q['searchQuery'] ?? '';
      this.hasSearched = !!this.searchWas;
      this.data = res || [];
    });
  }

  imageFor(el: keyable): string {
    return el['primaryImageSmall'] || el['primaryImage'] || '';
  }

  artistFor(el: keyable): string {
    return el['artistDisplayName']?.trim() || el['culture']?.trim() || 'Unknown';
  }

  dateFor(el: keyable): string {
    return el['objectDate']?.trim() || '';
  }
}
