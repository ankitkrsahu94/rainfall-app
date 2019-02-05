import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }     from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from  '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RainfallComponent } from './rainfall/rainfall.component';
import { ConstantsModule } from './constants.module';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PagenotfoundComponent,
    RainfallComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    AppRoutingModule,
    ConstantsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
