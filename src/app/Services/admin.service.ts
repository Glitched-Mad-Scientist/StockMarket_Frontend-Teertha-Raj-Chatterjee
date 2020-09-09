import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Company } from '../Models/company';
import { IPODetails } from '../Models/ipodetails';
import { StockPrice } from '../Models/stock-price';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  path:string = environment.gatewayURL;

  private _timeToReload = new Subject<void>();
  handler: HttpHandler;
  service: any;
  get timeToReload(){return this._timeToReload;}

  constructor(private http: HttpClient) { }

  public getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.path}/Admin/Company/All`);
  }

  public updateCompany(company: Company): Observable<any>{
    return this.http.put<any>(
      `${this.path}/Admin/Company/Update`, company)
    .pipe( tap(() => {this._timeToReload.next();}) );
  }

  public deleteCompany(id: string): Observable<any>{
    return this.http
      .delete<any>(`${this.path}/Admin/Company/Delete/${id}`)
      .pipe( tap(() => {this._timeToReload.next();}) );
  }

  public addCompany(company: Company): Observable<any>{
    return this.http
      .post<any>(`${this.path}/Admin/Company/Add`, company)
      .pipe( tap(() => {this._timeToReload.next();}) );
  }

  public isTaken(companyName: string): Observable<Company>{
    return this.http.get<Company>(`${this.path}/Admin/Company/Validate/${companyName}`);
  }

  public getIPOs(): Observable<IPODetails[]>{
    return this.http.get<IPODetails[]>(`${this.path}/Admin/IPO/All`);
  }

  public updateIPO(iPO: IPODetails): Observable<any>{
    return this.http.put<any>(
      `${this.path}/Admin/IPO/Update`, iPO)
    .pipe( tap(()=>{this._timeToReload.next();}) );
  }

  public addIPO(iPO: IPODetails): Observable<any>{
    return this.http
      .post<any>(`${this.path}/Admin/IPO/Add`, iPO)
      .pipe( tap(()=>{this._timeToReload.next();}) );
  }

  public importExcel(fileToUpload:File, worksheetName:string):Observable<StockPrice[]>{
    const formData: FormData = new FormData();
    formData.append('ExcelFile', fileToUpload, fileToUpload.name);
    formData.set('Worksheet', worksheetName);

    const http:HttpClient = new HttpClient(this.handler);
    const options = { headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })};

    return http.post<StockPrice[]>(`${this.path}/Excel/Upload`, formData, options);
  }

  public downloadSample(): Observable<Blob>{
    return this.http.get(`${this.path}/Excel/Sample`, {responseType: 'blob'});
  }


  private _reloadIpos = new Subject<void>();
  get reloadIpos(){return this._reloadIpos;}

  public getMissingSP(companyCode: string, startDate: Date, endDate: Date): Observable<Date[]>{
    return this.http.get<Date[]>(
      `${this.path}/Admin/StockPrices/Missing/${companyCode}/${startDate}/${endDate}`
    );
  }

}
