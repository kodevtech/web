import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { Profile } from '../../models/Profile';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements AfterViewInit {
  subtitle: string;
  error = '';
  type;
  profile = new Profile('', '', '', '', '', '', '');

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
      "margin-left": "-15px"
    },
    clearButton: {
      "background": "#fc4b6c"
    }
  }


  successMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.subtitle = 'This is some text within a card block.';
    this.authService.userInfo().subscribe(
      response => {
        console.log('response => ', response);
        this.profile = response;
        this.profile.imagePath = this.profile.imagePath ? this.profile.imagePath : null;
        this.profile.previewPath = this.profile.imagePath ? this.imagePath + this.profile.imagePath : null;
        if (this.profile.previewPath) {
          this.imageText = "Change Image";
        }

      },
      error => {
        console.log('info error => ', error);
      });
    this.myHeaders = {
      'Authorization': 'Bearer ' + authService.getToken()
    };
  }

  ngAfterViewInit() {
  }

  imageFinishedUploading(file) {
    if (file.serverResponse) {
      let data = JSON.parse(file.serverResponse._body);
      console.log(data);
      this.path = data.path;
      // this.profile.imagePath = this.path;
    }
  }

  onRemoved(file) {
    // do some stuff with the removed file.
    const data = {
      id: this.profile.id,
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


  async onUpdate() {
    const data = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      userName: this.profile.userName,
      imagePath: this.path
    };
    console.log(data);
    // service
    this.authService.userUpdate(JSON.stringify(data)).subscribe(
      response => {
        console.log('response => ', response);
        // this.error = '';
        // this.type = 'success';
        this.authService.showSuccess('Profile updated successfully');
        // this.successMessage = 'Profile updated successfully';
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/dashboard']);
          window.location.href = '';
        }, 3000);
      },
      error => {
        console.log('login error => ', error);
        // this.error = error.error;
        // this.type = 'danger';
        this.authService.showError(error.error);
      });
  }
}
