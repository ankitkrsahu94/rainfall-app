import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ConstantsModule } from './constants.module';
// import { API_URL } from './constants.module';

@Injectable({
  providedIn: 'root'
})

export class RainfallService {
  districtLevelSummaryUrl = this.constants.API_URL + "rainfall/mandaldeviation";
  mandalLevelDeviationUrl = this.constants.API_URL + "rainfall/districtsummary";
  constructor(private constants: ConstantsModule, private http: HttpClient) { }
 
  getDistrictLevelSummary(): Observable<any>{
    return this.http.get<any>(this.districtLevelSummaryUrl).pipe(
      catchError(this.handleError('District Level Summary', []))
    );
  }

  getAllMandalDeviationForDistrict(district: String): Observable<any>{
    return this.http.get<any>(this.mandalLevelDeviationUrl+"/"+district).pipe(
      catchError(this.handleError('All Mandals data for District : ' + district, []))
    );
  }

 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
