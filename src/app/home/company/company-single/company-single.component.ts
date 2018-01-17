import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { Companies } from '../../../models/Company';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-company-single',
  templateUrl: './company-single.component.html',
  styleUrls: ['./company-single.component.css']
})
export class CompanySingleComponent implements OnInit {
  company = new Companies('', '', '', '', 200, '');
  companyId;
  role = environment.role;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params, this.company);
      this.companyId = params.id;
    });

  }

  ngOnInit() {
    this.authService.getCompany(this.companyId).subscribe(
      response => {
        console.log('response => ', response);
        this.company = response;
        console.log(this.company);
      },
      error => {
        console.log('info error => ', error);
      });
  }

  onUpdate() {

    let data = {
      id: this.companyId,
      city: this.company.city,
      limit: parseInt(this.company.limit),
      companyName: this.company.companyName
    };

    // if(this.role === 'Super')
    //   data.companyName = this.company.companyName;

    // service
    this.authService.updateCompany(JSON.stringify(data)).subscribe(
      response => {
        console.log('update company error => ', response);
        this.authService.showSuccess('Company updated successfully');
        this.router.navigate(['/company']);
      },
      error => {
        console.log('update company error => ', error);
        this.authService.showError(error.error);
      });
  }

  onRemove() {

    const data = {
      id: this.companyId,
    };

    // service
    this.authService.deleteCompany(JSON.stringify(data)).subscribe(
      response => {
        console.log('delete company error => ', response);
        this.authService.showSuccess('Company deleted successfully');
        this.router.navigate(['/company']);
      },
      error => {
        console.log('delete company error => ', error);
        this.authService.showError(error.error);
      });
  }




}
