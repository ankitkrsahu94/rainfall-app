import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ConstantsModule } from '../constants.module';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent implements OnInit {
  uiStateList : Object[] = [{"locType":"State", "name" : "Andhra Pradesh"}];
  currentUrlParams : Object;

  updateLocationList(): void{
    this.currentUrlParams = this.route.snapshot.params;
    let bCrumbList = [];
    if(Object.keys(this.currentUrlParams).length > 0){
      for(let param in this.currentUrlParams){
        if(this.constants.LOCATION_TYPES.indexOf(param.toLowerCase()) >= 0){
          bCrumbList.push({'locType': param, 'name': this.currentUrlParams[param]});
        }
      }
    }
    this.uiStateList = bCrumbList;
  }

  /**
   * We need to separate location parameters and non-location parameters
   * then we need to recreate final object by appending required number of location
   * parameters to non-location parameters
   * @param elem
   */
  updateView(elem: Object): void{
    let urlPath = "/" + this.route.snapshot.routeConfig.path;
    let nonLocationParams = this.getNonLocationParams();
    let locationParams = this.getLocationParams(elem);
    let urlParams = Object.assign(nonLocationParams,locationParams);
    this.router.navigate([urlPath, urlParams]);
  }

  getNonLocationParams(): Object{
    let result = {};
    for(let key in this.currentUrlParams){
      if(this.constants.LOCATION_TYPES.indexOf(key.toLowerCase()) == -1)
        result[key] = this.currentUrlParams[key];
    }
    return result;
  }

  getLocationParams(elem: Object): Object{
    if(!elem) return {};

    let result = {};
    for(let key in this.currentUrlParams){
      if(this.constants.LOCATION_TYPES.indexOf(key.toLowerCase()) >= 0)
        result[key] = this.currentUrlParams[key];
      
      // Break the loop at the point where the click is performed
      if(key.toLowerCase() === elem['locType']) break;
    }
    return result;
  }

  constructor(private constants: ConstantsModule, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        console.log("breadcrumb : loaded");
        this.updateLocationList();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
  }

}
