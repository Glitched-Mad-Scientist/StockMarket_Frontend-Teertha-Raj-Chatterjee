import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
  companies: Company[];
  newCompany: Company = {} as Company;
  adding: boolean = true;
  isnametaken: boolean = false;
  formVisible: boolean = false;

  constructor(private service: AdminService) { 
    this.getAllCompanies();
  }

  ngOnInit(): void {
    // this.service.timeToReload.subscribe(()=>this.getAllCompanies());
  }

  public getAllCompanies(){
    this.service.getCompanies()
      .subscribe(data=>{
        this.companies=data;
      }, err=>console.log(err));
  }

  public updateCompany(company: Company): void{
    this.service.updateCompany(company).subscribe(data => {
      this.resetAddForm();
    }, err => console.log(err));
  }

  public deleteCompany(companyCode: string): void{
    if(confirm(`This action wil delete ${companyCode} permanently! Are you sure?`)) {
    this.service.deleteCompany(companyCode).subscribe(res=>{
      console.log(res);
    }, err=>console.log(err));
    }
  }

  public addCompany(company: Company): void{
    this.service.addCompany(company).subscribe(() => {}, err => console.log(err));
    this.resetAddForm();
  }

  public resetAddForm(): void{
    this.newCompany = ({} as Company);
    this.formVisible = false;
    this.adding = true;
  }

  public isNameTaken(): void{
    this.service.isTaken(this.newCompany.companyName)
      .subscribe(taken => this.isnametaken =  !!taken, err => {
        this.isnametaken = false;   // Can't check.
        console.log(err);
      });
  }
  public editCompany(company: Company): void{
    this.resetAddForm();
    this.adding = false;
    this.formVisible = true;
    this.newCompany = Object.assign({}, company);
    document.getElementById('companyForm')?.scrollIntoView({behavior: 'smooth'});
  }
}
