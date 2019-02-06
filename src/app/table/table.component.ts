import { Component, OnInit, ViewChild } from '@angular/core';
import { RainfallService } from '../rainfall.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ConstantsModule } from '../constants.module';

@Component({
  selector: 'rf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  //To use angular material table.
  displayedColumns = {
    "state" : ['locName', 'Scanty', 'Deficient', 'Normal', 'Excess'],
    "district" : ['locName', 'actualRF', 'normalRF', 'deviation', 'status']
  };

  locationHierarchy = ["district", "mandal", "village"];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  stateName : String;
  districtName : String;
  view : String;
  title = 'Rainfall Table';

  ngOnInit(): void{   
    this.loadCurrentState();
  } 

  loadCurrentState() : void{
    let state = this.route.snapshot.paramMap.get('state');

    if(!state){
      this.router.navigate(["/rainfall",{country: this.constants.DEFAULT_COUNTRY, state: this.constants.DEFAULT_STATE}]);
    }
    else{
      this.stateName = this.route.snapshot.paramMap.get('state');
      this.districtName = this.route.snapshot.paramMap.get('district');
      this.getTableData();
    }
  }
  getTableData(): void{
    if(this.districtName == null){
      this.rfService.getDistrictLevelSummary().subscribe(data => this.postProcessRainfallData(data));
      this.view = 'state';
    }
    else{
      this.rfService.getAllMandalDeviationForDistrict(this.districtName).subscribe(data => this.postProcessRainfallData(data));
      this.view = 'district';
    }
  }

  getNavigationParameters() : Object{
    return this.route.snapshot.params;
  }

  navigateToLocation(locationType: string, locationName : string) : void{
    let existingParams = this.getNavigationParameters();
    let updatedParams = {};
    if(Object.keys(existingParams).length > 0){
      for(let locType in existingParams){
        updatedParams[locType] = existingParams[locType];
      }
    }
    updatedParams[locationType] = locationName;
    this.router.navigate(['/rainfall', updatedParams]);
  }

  postProcessRainfallData(data:any): void{
    var result = [];

    if(data === undefined || data === null) return;

    for(var locationName in data){
      var row = {};
      row = data[locationName];
      row['locName'] = locationName;
      result.push(row);
    }
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.sort = this.sort;
  }
 
  constructor(private constants: ConstantsModule, private route: ActivatedRoute, private rfService: RainfallService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.loadCurrentState();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
  }
}
