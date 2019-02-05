import { Component, OnInit, ViewChild } from '@angular/core';
import { RainfallService } from './rainfall.service';
import { Observable } from 'rxjs';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //To use angular material table.
  displayedColumns: string[] = ['locName', 'value'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  title = 'rainfall-app';
  rainfallTableData : any;

  ngOnInit(): void{
    this.getRainfallTableData();
  } 

  getRainfallTableData(): void{
    this.rfService.getTableData().subscribe(data => this.postProcessRainfallData(data));
  }

  postProcessRainfallData(data:any): void{
    console.log(data);
    var result = [];

    if(data === undefined || data === null) return;

    for(let locationName in data['Jan-19']){
      var row = {};
      row['locName'] = locationName;
      row['value'] = data['Jan-19'][locationName];
      result.push(row);
    }
    this.rainfallTableData = result;
    //Angular material
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.sort = this.sort;
  }

  constructor(private rfService: RainfallService){

  }
}
