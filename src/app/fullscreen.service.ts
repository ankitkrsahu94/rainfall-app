import { Injectable } from '@angular/core';
import * as maptalks from 'maptalks'

@Injectable({
  providedIn: 'root'
})


export class FullscreenService extends maptalks.control.Control{

  options:Object;

  constructor(options:Object) {
    console.log(options);
    super(options);
  }


  buildOn(map:maptalks.Map) {
    var dom = document.getElementById(this.options['id']);
    dom.innerText = this.options['context'];
    return dom;
  }

  onAdd() {
    console.log('added');
  }

  onRemove() {
    console.log('removeed');
  }
  
  
}

