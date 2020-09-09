import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company';
import { AdminService } from 'src/app/Services/admin.service';
import { IPODetails } from 'src/app/Models/ipodetails';

@Component({
  selector: 'app-manage-company',
  templateUrl: './update-ipo.component.html',
  styleUrls: ['./update-ipo.component.css']
})
export class UpdateIPOComponent implements OnInit {
  ipos: IPODetails[];
  newIPO: IPODetails = {} as IPODetails;
  adding: boolean = true;
  formVisible: boolean = false;

  constructor(private service: AdminService) { 
    this.getAllIPOs();
  }

  ngOnInit(): void {
    // this.service.timeToReload.subscribe(()=>this.getAllCompanies());
  }

  public getAllIPOs(){
    this.service.getIPOs()
      .subscribe(data => {
        this.ipos = data;
      }, err => console.log(err));
  }

  public updateIPO(ipo: IPODetails): void{
    this.service.updateIPO(ipo).subscribe(data => {
      this.resetAddForm();
    }, err => console.log(err));
  }

  public addIPO(ipo: IPODetails): void{
    this.service.addIPO(ipo).subscribe(() => {}, err => console.log(err));
    this.resetAddForm();
  }

  public resetAddForm(): void{
    this.newIPO = ({} as IPODetails);
    this.formVisible = false;
    this.adding = true;
  }
  public editIPO(ipo: IPODetails): void{
    this.resetAddForm();
    this.adding = false;
    this.formVisible = true;
    this.newIPO = Object.assign({}, ipo);
    document.getElementById('ipoForm')?.scrollIntoView({behavior: 'smooth'});
  }
}
