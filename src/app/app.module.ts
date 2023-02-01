import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchSideComponent } from './search-side/search-side.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResultComponent } from './result/result.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullViewComponent } from './full-view/full-view.component';
import { LandingComponent } from './landing/landing.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    SearchSideComponent,
    HeaderComponent,
    ResultComponent,
    FooterComponent,
    ListItemComponent,
    FullViewComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
