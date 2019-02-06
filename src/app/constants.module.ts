import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: []
})


export class ConstantsModule { 
  API_URL = 'http://34.217.79.156:8080/api/';  
  LOCATION_TYPES = ['country','state', 'district', 'mandal', 'block', 'village'];
  DEFAULT_COUNTRY = "India";
  DEFAULT_STATE = "Andhra Pradesh";
}
