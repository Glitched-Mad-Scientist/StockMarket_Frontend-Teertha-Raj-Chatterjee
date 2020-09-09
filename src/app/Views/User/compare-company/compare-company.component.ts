import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company';
import { UserService } from 'src/app/Services/user.service';
import { CompanyDetails } from 'src/app/Models/company-details';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css'],
  providers:[DatePipe]
})
export class CompareCompanyComponent implements OnInit {
  companyDetails:CompanyDetails[] = [];
  companies:Company[] = [];
  selectedCompany:Company;
  startDate:string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  endDate:string = this.startDate;
  dates:string[]=[];

  chartOptions = {scaleShowVerticalLines: false, responsive: true};
  chartLabels:string[];
  chartType:string = 'bar';
  chartLegend:boolean = true;
  chartData:{data:number[], label:string}[];

  constructor(
    private service: UserService, 
    private flashMessage: FlashMessagesService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.service.getCompanies()
    .subscribe(C=>{this.companies = C;});
  }
  
  onDateChange(){
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);

    if(startDate>endDate){
      this.flashMessage.show("'From' date must be before the 'To' date.", {cssClass: 'alert-danger', timeout: 4000});
      return;
    }

    this.dates = [];
    for(let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)){
      this.dates.push(this.datepipe.transform(d, 'd/M/yy'));
    }
    
    this.companyDetails.forEach(detail => {
      this.service
        .getStockPrices(detail.company, this.startDate, this.endDate)
        .then(CD => {detail = CD});
    });

    this.generateChart();
  }

  onCompanyAdd(C:Company){
    this.service
      .getStockPrices(C, this.startDate, this.endDate)
      .then(CD=>{
        this.companyDetails.push(CD);
        var index = this.companies.indexOf(C);
        if(index!=-1) this.companies.splice(index, 1);
        this.selectedCompany = null;
        this.generateChart();
      }
    );
  }

  public generateChart(){
    this.chartLabels = this.dates;
    this.chartData = this.companyDetails.map(CD=>{ return {
        data: CD.stockPrices.map(SP=>{return SP?.CurrentPrice}),
        label: `${CD.company.companyName} - ${CD.company.companyCode}`
      }});
    // console.log(this.companyDetails)
  }

  public downloadExcel(){
    const companyCodes:number[] = this.companyDetails.map(CD=>CD.company.companyCode);
    this.service.downloadExcel(companyCodes, this.startDate, this.endDate)
      .subscribe(file=> {
      const url:string = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Export.xlsx");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}