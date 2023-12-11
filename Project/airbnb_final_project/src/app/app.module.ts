import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeAnalysisComponent } from './components/time-analysis/time-analysis.component';
import { ResultsDisplayComponent } from './components/results-display/results-display.component';
import { DisplayListingComponent } from './components/display-listing/display-listing.component';
import { SearchComponent } from './components/search/search.component';
import { ParquetService } from './services/parquet.service';

@NgModule({
  declarations: [
    AppComponent,
    TimeAnalysisComponent,
    ResultsDisplayComponent,
    DisplayListingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ParquetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
