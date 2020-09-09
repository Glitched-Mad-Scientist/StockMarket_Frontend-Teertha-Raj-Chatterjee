export interface IPODetails {
    id:number;
    companyCode:string;
    companyName:string;
    stockExchange:string;
    pricePerShare:number;
    totalNumberOfShares:number;
    openDate?:Date;
    remarks?:string;
}
