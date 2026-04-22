import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'artgallery-theme';
type Mode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<Mode>(this.initial());

  constructor() {
    this.apply(this.mode());
  }

  toggle() {
    const next: Mode = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(next);
    this.apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  private initial(): Mode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  private apply(mode: Mode) {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('dark', mode === 'dark');
  }
}
