import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { UserSingleComponent } from './user-single.component';
import { ImageUploadModule } from "angular2-image-upload";

const routes: Routes = [{
  path: '',
  data: {
    title: 'User Page',
    urls: [{ title: 'User Page', url: '/company' }, { title: 'User Page' }]
  },
  component: UserSingleComponent
}];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ImageUploadModule.forRoot()
  ],
  declarations: [UserSingleComponent],
  providers: [AuthService]

})

export class UserSingleModule {
}
