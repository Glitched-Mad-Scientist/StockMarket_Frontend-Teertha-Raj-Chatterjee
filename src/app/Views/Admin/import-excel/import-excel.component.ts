import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { StockPrice } from 'src/app/Models/stock-price';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  loading: boolean = false;
  fileToUpload: File = null;
  stockPrices: StockPrice[] = [];
  @ViewChild('excelForm') form: NgForm;

  constructor(private service: AdminService, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(formData: any): void{
    this.service
      .importExcel(this.form.value.fileInput, this.form.value.worksheetName)
      .subscribe(data => {this.stockPrices = data}, err => {
        let errMsg = '';
        if (err.error instanceof ErrorEvent) {
            errMsg = `Error: ${err.error.message}`;
        }
        else {
            errMsg = `Error ${err.status} - ${err.error}`;
        }
        console.log(err);
        this.flashMessage.show( errMsg, {cssClass: 'alert-danger', timeout: 4000} );
      });
  }

  downloadSample(){
    this.service.downloadSample().subscribe(file=> {
      const url: string = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Template.xlsx');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

}
