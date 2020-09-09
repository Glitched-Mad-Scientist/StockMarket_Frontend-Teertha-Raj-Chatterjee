import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Company } from '../Models/company';
import { CompanyDetails } from '../Models/company-details';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: string = environment.gatewayURL;

  constructor(private http: HttpClient) { }

  public getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.path}/User/Companies/All`);
  }

  public getStockPrices(company: string|Company, startDate: string, endDate: string): Promise<CompanyDetails>{
    const companyCode = typeof(company) === 'string' ? company : company.companyCode;

    return this.http
      .get<CompanyDetails>(`${this.path}/User/StockPrices/${companyCode}/${startDate}/${endDate}`)
      .pipe(first())
      .toPromise();
  }

  public downloadExcel(companyCodes: number[], startDate: string, endDate: string): Observable<Blob>{
    const body = {
      companyCodes: companyCodes,
      startDate: startDate,
      endDate: endDate
    }
    return this.http.post(`${this.path}/Excel/Download`, body, {responseType: 'blob'});
  }
}