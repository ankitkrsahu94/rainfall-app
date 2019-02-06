import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantsModule } from '../constants.module';
@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.css']
})

export class RainfallComponent implements OnInit {

  constructor(private constants: ConstantsModule, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let country = this.route.snapshot.paramMap.get('country');
    let state = this.route.snapshot.paramMap.get('state');

    if(!country || !state)
      this.router.navigate(["/rainfall",{country: this.constants.DEFAULT_COUNTRY, state: this.constants.DEFAULT_STATE}]);
  }

}
