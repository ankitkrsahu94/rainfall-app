import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RainfallComponent } from './rainfall/rainfall.component';
import { GisComponent } from './waterdataonline/gis/gis.component';

const routes: Routes = [
  { path: '', redirectTo: '/rainfall', pathMatch: 'full' },
  { path: 'rainfall', component: RainfallComponent },
  { path: 'waterdataonline/gis', component: GisComponent},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
