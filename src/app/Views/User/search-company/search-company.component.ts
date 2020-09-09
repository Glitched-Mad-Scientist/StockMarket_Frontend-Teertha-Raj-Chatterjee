import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Company } from 'src/app/Models/company';

@Component({
  selector: 'app-search-compny',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  companies: Company[];
  company: Company;
  suggestions: Company[];
  showSuggestions: boolean = false;
  log = console.log;
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getCompanies().subscribe(C => this.companies = C);
    this.suggestions = this.companies;
  }

  search(query: string){
    if (query && query.length >= 2) {
      this.suggestions = this.companies
        .filter(
          company => company.companyName.toLowerCase().startsWith(query.toLowerCase()) ||
          company.companyCode.toString().toLowerCase().startsWith(query.toLowerCase())
        );
    }
    else { this.suggestions = []; }
  }

  public setCompany(company: Company): void{
    this.company = company;
  }

}
