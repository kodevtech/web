import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { Permission } from '../../models/Permission';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  permissions = [];
  closeResult: string;
  companyModel: string;
  public mr: NgbModalRef;

  constructor(private authService: AuthService, private modalService: NgbModal, private router: Router) {
    // console.log(this.permissions);
  }

  ngOnInit() {
    this.authService.getPermissions().subscribe(
      response => {
        console.log('response => ', response);
        this.permissions = response.permissions;
        console.log(this.permissions);
      },
      error => {
        console.log('permissions error => ', error);
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

  // Create permission
  onCreate() {
    //
    // const data = {
    //   companyName: this.company.companyName,
    //   city: this.company.city,
    // };
    // console.log(data);

    // service
    // this.authService.createP(JSON.stringify(data)).subscribe(
    //   response => {
    //     this.mr.close();
    //     console.log('create company success => ', response);
    //     this.authService.showSuccess('Company with default admin user has been created');
    //     this.ngOnInit();
    //   },
    //   error => {
    //     // this.mr.close();
    //     console.log('create company error => ', error);
    //     this.authService.showError(error.error);
    //   });
  }

}
