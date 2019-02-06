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
  
  updateLocationList(): void{
    let urlParams = this.route.snapshot.params;
    let bCrumbList = [];
    if(Object.keys(urlParams).length > 0){
      for(let param in urlParams){
        if(this.constants.LOCATION_TYPES.indexOf(param.toLowerCase()) >= 0){
          bCrumbList.push({'locType': param, 'name': urlParams[param]});
        }
      }
    }
    this.uiStateList = bCrumbList;
  }

  bringViewToPosition(elem: Object): void{
    let urlPath = "/" + this.route.snapshot.routeConfig.path;
    let urlParams ;
    this.router.navigate([urlPath, urlParams]);
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
