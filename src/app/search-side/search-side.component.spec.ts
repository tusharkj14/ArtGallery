import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSideComponent } from './search-side.component';

describe('SearchSideComponent', () => {
  let component: SearchSideComponent;
  let fixture: ComponentFixture<SearchSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
