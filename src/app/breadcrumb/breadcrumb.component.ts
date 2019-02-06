import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent implements OnInit {
  uiStateList : string[];
  
  updateLocationList(): void{
    let urlPath = this.route.snapshot.routeConfig.path;
    let urlParams = this.route.snapshot.params;
    let bCrumbList = [];
    if(Object.keys(urlParams).length > 0){
      for(let param in urlParams){
        
      }
    }
  }

  constructor(private router: Router, private route: ActivatedRoute) {
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
