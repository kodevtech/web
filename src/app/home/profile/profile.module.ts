import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile.component';
import {AuthService} from '../../shared/auth/auth.service';
import { NgUploaderModule } from 'ngx-uploader';
import { ImageUploadModule } from "angular2-image-upload";

const routes: Routes = [{
  path: '',
  data: {
    title: 'Profile Page',
    urls: [{title: 'Dashboard', url: '/profile'}, {title: 'Profile Page'}]
  },
  component: ProfileComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgUploaderModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [ProfileComponent],
  providers: [AuthService]
})
export class ProfileModule {
}
