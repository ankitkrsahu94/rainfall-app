import { Component, OnInit, ViewChild } from '@angular/core';
import { RainfallService } from '../rainfall.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

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

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  stateName : String;
  districtName : String;
  view : String;
  title = 'Rainfall Table';

  ngOnInit(): void{
    this.stateName = this.route.snapshot.paramMap.get('state');
    this.districtName = this.route.snapshot.paramMap.get('district');
    this.getTableData();
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
 
  constructor(private route: ActivatedRoute, private rfService: RainfallService) { }
}
