import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


const DEFAULT_COUNTRY = "India";
const DEFAULT_STATE = "Andhra Pradesh";

@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.css']
})

export class RainfallComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let country = this.route.snapshot.paramMap.get('country');
    let state = this.route.snapshot.paramMap.get('state');

    if(!country || !state)
      this.router.navigate(["/rainfall",{country: DEFAULT_COUNTRY, state: DEFAULT_STATE}]);
  }

}
