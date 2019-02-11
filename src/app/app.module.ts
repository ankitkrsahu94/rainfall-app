import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }     from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule, MatCardModule } from  '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RainfallComponent } from './rainfall/rainfall.component';
import { ConstantsModule } from './constants.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MisComponent } from './waterdataonline/mis/mis.component';
import { GisComponent } from './waterdataonline/gis/gis.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PagenotfoundComponent,
    RainfallComponent,
    BreadcrumbComponent,
    MisComponent,
    MapComponent,
    GisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    ConstantsModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
