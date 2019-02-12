import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as maptalks from 'maptalks';
import { esri } from 'maptalks.esri';
import { ConstantsModule } from '../../constants.module';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.css']
})
export class GisComponent implements OnInit {
  map: maptalks.Map;
  parentLocName : string;
  arcUrl : string;
  ngOnInit() {
    this.parentLocName = this.route.snapshot.paramMap.get('parentLocName');
    if(!this.parentLocName)
    this.router.navigate(["/waterdataonline/gis", this.constants.DEFAULT_COUNTRY]);
    // this.drawMap();
    this.drawFeatureLayer();
    // this.addWMSLayers();
  }

  drawMap(): void{
    this.map = new maptalks.Map('map', {
      center: [79.971159, 23.180713],
      zoom: 5.5,
      zoomControl: {
        'position'  : 'top-left',
        'slider'    : true,
        'zoomLevel' : true
      },
      baseLayer: new maptalks.TileLayer('base', {
        'urlTemplate' : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'subdomains'  : ['a','b','c','d'],
        'attribution'  : '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, '+
        '&copy; <a href="https://carto.com/attributions">CARTO</a>'
      })
    });

    var layer = new maptalks.VectorLayer('vector').addTo(this.map);

    for(let i=0; i<10; i++){
      let lat = 79.971159 + Math.floor(Math.random() * 10);
      let lng = 23.180713 + Math.floor(Math.random() * 10);
      let marker = new maptalks.Marker(
        [lat, lng],
        {
          'symbol' : {
            'id':i,
            'markerType': 'path',
            'markerPath': 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
            'markerFill' : 'rgb(216,115,149)',
            'markerLineColor' : '#fff',
            'markerPathWidth': 16,
            'markerPathHeight': 23,
            'markerWidth': 30,
            'markerHeight': 42,
          }
        }
      ).addTo(layer);

      marker.setInfoWindow({
        'title'     : 'Marker number ' + (i+1) + ' InfoWindow',
        'content'   : '<h1>Some heading</h1><p>This marker body can accept html document.</p>'

        // 'autoPan': true,
        // 'width': 300,
        // 'minHeight': 120,
        // 'custom': false,
        //'autoOpenOn' : 'click',  //set to null if not to open when clicking on marker
        //'autoCloseOn' : 'click'
      });
      marker.on("click", this.onEvent);
      marker.on("mouseenter", this.onMouseOver);
      marker.on("mouseout", this.onMouseOut);
    }
  }

  onMouseOver(param: Object): boolean{
    console.log("Hovering over some object");
    return false;
  }

  onMouseOut(param: Object): boolean{
    console.log("Mouse removed");
    return false;
  }

  onEvent(param : any): boolean{
    console.log(param);
    console.log("You performed " + param.type + " action on element with id : " + param.target.getSymbol().id);
    return false;
  }

  addWMSLayers():void{
    let districtLayer:maptalks.WMSTileLayer = new maptalks.WMSTileLayer('District', {
      'urlTemplate' : 'http://portal.tamcnhp.com/server/services/ewis/eswdes_service3/MapServer/WMSServer?',
      'crs' : 'EPSG:4326',
      'layers' : 'CDATA:0',
      'styles' : 'default',
      // 'version' : '1.1.1',
      'format': 'image/png',
      'transparent' : true,
      'uppercase' : true,
      'minZoom':2
    });
  
    districtLayer.addTo(this.map);
  
  }

  drawFeatureLayer(): void{
    this.map = new maptalks.Map('map', {
      //center: [-122.23,37.75],
      center:[ 109.22450763502036,34.367512417065313],
      zoom: 12,
      attribution: {
          content: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      },
      baseLayer: new maptalks.TileLayer('base', {
          urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c', 'd']
      })
    });
    var flayer = new maptalks.esri.FeatureLayer('flayer','http://117.36.75.134:6080/arcgis/rest/services/LT/WBJ/FeatureServer/1',{
        symbol:{
            // markerFile:'images/apple.png',
            'markerType': 'path',
            'markerPath': 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
            lineColor: 'red'
        }
    });
    flayer.addTo(this.map);
    flayer.on('loadend', function (e) {
        var geometries = e.geometries;
        console.log(geometries.length);
    });
    var features =[{
        "geometry" : {"x" : 114.25, "y" : 33.80},      
        "attributes" : {
          "id" : "1",
          "name" : "Joe Smith"
        }
      },
      {
        "geometry" : { "x" : 114.27, "y" : 34.086 },      
        "attributes" : {
          "id" : "2",
          "name" : "John Doe"
        }
      }
    ];
    //增加要素
    flayer.addFeatures(features,function(res){
        console.log(res);
    });
  }


  // drawArcGISMap(): void{
    // var arcUrl = 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer';
    // maptalks.SpatialReference.loadArcgis(arcUrl + '?f=pjson', function (err, conf) {
    //   console.log(this);
    //   if (err) {
    //     throw new Error(err);
    //   }
    //   var ref = conf.spatialReference;
    //   ref.projection = 'EPSG:4326';

    //   var map = new maptalks.Map('map', {
    //     center: [79.971159, 23.180713],
    //     zoom: 3.5,
    //     maxZoom : 16,
    //     zoomControl: {
    //       'position'  : 'top-left',
    //       'slider'    : true,
    //       'zoomLevel' : true
    //     },
    //     spatialReference : ref,
    //     baseLayer: new maptalks.TileLayer('base', {
    //       'tileSystem' : conf.tileSystem,
    //       'tileSize' : conf.tileSize, // [512, 512]
    //       'urlTemplate' : arcUrl + '/tile/{z}/{y}/{x}',
    //       'attribution' : '&copy; <a target="_blank" href="' + arcUrl + '"">ArcGIS</a>'
    //     })
    //   });
    // });
  // }
  constructor(private constants: ConstantsModule, private router: Router, private route: ActivatedRoute) { }

}
