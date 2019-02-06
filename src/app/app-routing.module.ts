import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RainfallComponent } from './rainfall/rainfall.component';

const routes: Routes = [
  { path: '', redirectTo: '/rainfall/Andhra Pradesh', pathMatch: 'full' },
  { path: 'rainfall', component: RainfallComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
