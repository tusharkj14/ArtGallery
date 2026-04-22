import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtworksService } from '../artworks.service';

type Category = 'Artwork' | 'Artist';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: false,
})
export class LandingComponent implements OnInit {
  private artworks = inject(ArtworksService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  suggestions = [
    { label: 'Van Gogh', category: 'Artist' as const, query: 'Van Gogh' },
    { label: 'Monet', category: 'Artist' as const, query: 'Monet' },
    { label: 'Hokusai', category: 'Artist' as const, query: 'Hokusai' },
    { label: 'Sunflowers', category: 'Artwork' as const, query: 'Sunflowers' },
    { label: 'Starry Night', category: 'Artwork' as const, query: 'Starry Night' },
    { label: 'Portrait', category: 'Artwork' as const, query: 'Portrait' },
  ];

  loading$: Observable<boolean> = this.artworks.sendLoadStatus();
  hasSearched = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const q = (params.get('q') ?? '').trim();
      const scope: Category = params.get('scope') === 'Artist' ? 'Artist' : 'Artwork';
      this.hasSearched = !!q;

      if (!q) {
        this.artworks.clear();
        return;
      }

      const current = this.artworks.sendSearchQuery();
      if (current['searchQuery'] === q && current['field'] === scope) return;
      this.artworks.search(scope, q);
    });
  }

  runSuggestion(s: { category: Category; query: string }) {
    this.router.navigate(['/'], { queryParams: { q: s.query, scope: s.category } });
  }
}
