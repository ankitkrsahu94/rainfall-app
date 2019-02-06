import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private route: ActivatedRoute) { }

  getURLParams(): Object{
    let urlParams = this.route.snapshot.params;
    return Object.assign({selected: false}, urlParams);
  }
}
