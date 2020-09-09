import { Time } from '@angular/common';
import { Company } from './company';

export interface StockPrice {
    Id:number;
    CompanyCode:number;
    StockExchange:string;
    CurrentPrice:number;
    Date:Date;
    Time:Time;
}
