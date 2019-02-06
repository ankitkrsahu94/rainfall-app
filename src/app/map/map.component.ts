import { Component, OnInit } from '@angular/core';
import * as maptalks from 'maptalks'

import {FullscreenService} from '../fullscreen.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: maptalks.Map;
  mapblock :HTMLElement;
  stateName : String;
  districtName : String;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.stateName = this.route.snapshot.paramMap.get('state');
    this.districtName = this.route.snapshot.paramMap.get('district');

    this.initMap();
    this.mapblock = document.getElementById("map");
    this.addLayers();
  }

  initMap():void{
    this.map = new maptalks.Map('map', {
      center: [80.9708656,15.91],
      zoom: 7,
      layerSwitcherControl: {
        'position'  : 'top-right',
        // title of base layers
        'baseTitle' : 'Base Layers',
        // title of layers
        'overlayTitle' : 'Layers',
        // layers you don't want to manage with layer switcher
        'excludeLayers' : [],
        // css class of container element, maptalks-layer-switcher by default
        'containerClass' : 'maptalks-layer-switcher'
      },
      baseLayer: new maptalks.GroupTileLayer('Base TileLayer', [
        new maptalks.TileLayer('Carto light',{
          'urlTemplate': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          'subdomains'  : ['a','b','c','d']
        }),
        new maptalks.TileLayer('Carto dark',{
          'visible' : false,
          'urlTemplate': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          'subdomains'  : ['a','b','c','d']
        })
      ])
    });

    let fullscreenService = new FullscreenService({"position":"top-left","context":"[ ]","id":"fullscreenbutton"});
    this.map.addControl(fullscreenService);

    let zoomControl = new maptalks.control.Zoom({
      'position'  : 'top-left',
      'slider'    : false,
      'zoomLevel' : false
    });
    this.map.addControl(zoomControl);

  }

  toggleFullScreen():void{
    if(this.map.isFullScreen()){
      this.map.cancelFullScreen();
    }else{
      this.map.requestFullScreen(this.mapblock);
    }
  }


  addLayers():void{
    let districtLayer:maptalks.WMSTileLayer = new maptalks.WMSTileLayer('District', {
      'urlTemplate' : 'http://geoserver.vassarlabs.com/geoserver/VASSARLABS/gwc/service/wms',
      'srs' : 'EPSG:3857',
      'layers' : 'VASSARLABS:AP_DISTRICT',
      'styles' : '',
      'version' : '1.1.1',
      'format': 'image/png',
      'transparent' : true,
      'uppercase' : true,
      'minZoom':6
    });
  
    districtLayer.addTo(this.map);
  
  }



}
