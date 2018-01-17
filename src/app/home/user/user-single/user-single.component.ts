import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { CompanyUser } from '../../../models/CompanyUser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {

  user = new CompanyUser('', '', '', '', '', false, '', '', '', '');
  userId;
  companyId;
  role = environment.role;
  pwdVisible = false;
  userEmail;
  uploadPath = environment.auth_end_point + 'upload';
  imagePath = environment.public_end_point;
  myHeaders: any;
  path: any;

  imageText = "Select Image";


  customStyle = {
    layout: {
      "background-color": "unset",
      "border": "unset",
      "color": "#FFF",
      "font-size": "12px",
      "margin-left" : "-15px"
    },
    clearButton: {
      "background": "#fc4b6c"
    }
  }

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params, this.user);
      this.userId = params.uid;
      this.companyId = params.cid;
    });

    let userData = JSON.parse(localStorage.getItem('data'));
    this.userEmail = userData.email;
    // console.log(this.userEmail);


    this.myHeaders = {
      'Authorization': 'Bearer ' + authService.getToken()
    };

    // console.log(this.myHeaders);
  }

  ngOnInit() {
    this.authService.getUser(this.userId).subscribe(
      response => {
        // console.log('response => ', response);
        this.user = response;
        this.user.imagePath = this.user.imagePath ? this.user.imagePath : null;
        this.user.previewPath = this.user.imagePath ? this.imagePath + this.user.imagePath : null;
        if(this.user.previewPath){
          this.imageText = "Change Image";
        }
        console.log(this.user);
      },
      error => {
        console.log('info error => ', error);
      });
  }
  imageFinishedUploading(file) {
    if(file.serverResponse) {
      let data = JSON.parse(file.serverResponse._body);
      console.log(data);
      this.path = data.path;
      // this.user.imagePath = this.path;
    }
  }

  onRemoved(file) {
    // do some stuff with the removed file.
    const data = {
      id: this.userId,
      filename: this.path
    };

    console.log(data);

    // service
    this.authService.unlinkUpload(JSON.stringify(data)).subscribe(
      response => {
        console.log('delete image error => ', response);
        this.path = '';
        this.authService.showSuccess('Image removed successfully');
      },
      error => {
        console.log('delete image error => ', error);
        this.authService.showError(error.error);
      });
  }

  onUploadStateChanged(state: boolean) {
    console.log(JSON.stringify(state));
  }

  onToggle(){
    console.log(this.pwdVisible);
    this.pwdVisible = !this.pwdVisible;
  }


  onUpdate() {

    const data = {
      id: this.userId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.userName,
      isVerified: this.user.isVerified,
      imagePath : this.path
    };

    // service
    this.authService.updateUser(JSON.stringify(data)).subscribe(
      response => {
        console.log('update user error => ', response);
        this.authService.showSuccess('User updated successfully');
        this.router.navigate(['/users/' + this.companyId]);
      },
      error => {
        console.log('update user error => ', error);
        this.authService.showError(error.error);
      });
  }

  onRemove() {

    const data = {
      id: this.userId,
    };

    // service
    this.authService.deleteUser(JSON.stringify(data)).subscribe(
      response => {
        console.log('delete user error => ', response);
        this.authService.showSuccess('User deleted successfully');
        this.router.navigate(['/users/' + this.companyId]);
      },
      error => {
        console.log('delete user error => ', error);
        this.authService.showError(error.error);
      });
  }

}
