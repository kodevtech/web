import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { Companies } from '../../models/Company';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #009efb;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
export class CompanyComponent implements OnInit {

  // companies: Companies;
  companies = [];
  closeResult: string;
  companyModel: string;
  public mr: NgbModalRef;
  company = new Companies('', '', '', '', 200, '');
  role = environment.role;

  constructor(private authService: AuthService, private modalService: NgbModal, private router: Router) {
    console.log(this.companies);
  }

  ngOnInit() {
    this.authService.getCompanies().subscribe(
      response => {
        console.log('response => ', response);
        this.companies = response.companies;
        console.log(this.companies);
      },
      error => {
        console.log('info error => ', error);
      });
  }

  open(content) {
    console.log(content);
    this.mr = this.modalService.open(content);
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Create company
  onCreate() {

    const data = {
      companyName: this.company.companyName,
      city: this.company.city,
      limit: this.company.limit
    };
    // console.log(data);

    // service
    this.authService.createCompany(JSON.stringify(data)).subscribe(
      response => {
        this.mr.close();
        console.log('create company success => ', response);
        this.authService.showSuccess('Company with default admin user has been created');
        this.ngOnInit();
      },
      error => {
        // this.mr.close();
        console.log('create company error => ', error);
        this.authService.showError(error.error);
      });
  }

}
