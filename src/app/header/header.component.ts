import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../theme.service';

type Category = 'Artwork' | 'Artist';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  theme = inject(ThemeService);

  category: Category = 'Artwork';
  query = '';

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
      this.category = params.get('scope') === 'Artist' ? 'Artist' : 'Artwork';
    });
  }

  setCategory(c: Category) {
    this.category = c;
    const q = this.query.trim();
    if (q) this.router.navigate(['/'], { queryParams: { q, scope: c } });
  }

  submit() {
    const q = this.query.trim();
    if (!q) return;
    this.router.navigate(['/'], { queryParams: { q, scope: this.category } });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
