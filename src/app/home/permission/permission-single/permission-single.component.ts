import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { Permission } from '../../../models/Permission';


@Component({
  selector: 'app-permission-single',
  templateUrl: './permission-single.component.html',
  styleUrls: ['./permission-single.component.css']
})
export class PermissionSingleComponent implements OnInit {

  permission = new Permission('', '', '');
  permId;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.permId = params.id;
    });
  }

  ngOnInit() {
    this.authService.getPermission(this.permId).subscribe(
      response => {
        console.log('response => ', response);
        this.permission = response;
        console.log(this.permission);
      },
      error => {
        console.log('info error => ', error);
      });
  }

  onUpdate() {

    const data = {
      id: this.permId,
      permissionName: this.permission.permissionName,
      priority: parseInt(this.permission.priority),
    };

    // service
    this.authService.updatePermission(JSON.stringify(data)).subscribe(
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
      id: this.permId,
    };

    // service
    this.authService.deletePermission(JSON.stringify(data)).subscribe(
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
