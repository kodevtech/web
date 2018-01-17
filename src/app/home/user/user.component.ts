import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateUser } from '../../models/User';
import { CompanyUser } from '../../models/CompanyUser';
import { Permission } from '../../models/Permission';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent implements OnInit {

  // users = new CompanyUser('','','','','','');
  users: CompanyUser;
  companyId;
  role = environment.role;
  // user = new User('', '', '', false, '', '', '');

  user = new CreateUser('', '', '', '', '', '', '');
  permissions = [];

  public mr: NgbModalRef;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.companyId = params.cid;

      this.authService.getPermissions().subscribe(
        response => {
          console.log('response => ', response);
          this.permissions = response.permissions;
          console.log(this.permissions);
        },
        error => {
          console.log('permissions error => ', error);
        });

    });
  }

  ngOnInit() {
    this.authService.getCompanyUser(this.companyId).subscribe(
      response => {
        console.log('response => ', response);
        this.users = response.users;
        console.log(this.users);
      },
      error => {
        console.log('info error => ', error);
      });
  }

  // Create user
  onCreate(user) {
    if (!user.email) {
      this.authService.showWarning('Email is required!');
    } else if (!user.permissionId) {
      this.authService.showWarning('Permission is required!');
    } else {
      const data = {
        email: user.email.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        permissionId: user.permissionId,
        companyId: this.companyId
      };
      console.log(data);
      // service
      this.authService.createCompanyUser(JSON.stringify(data)).subscribe(
        response => {
          this.mr.close();
          console.log('response => ', response);
          this.authService.showSuccess('Successfully created and verification mail has been send to user\'s email');
          this.ngOnInit();
        },
        error => {
          console.log('signup error => ', error);
          this.authService.showError(error.error);
        });
    }
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

}
