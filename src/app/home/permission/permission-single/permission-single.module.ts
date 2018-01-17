import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/auth/auth.service';
import { NgUploaderModule } from 'ngx-uploader';
import { PermissionSingleComponent } from './permission-single.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Permission Page',
    urls: [{ title: 'Permission Page', url: '/permission' }, { title: 'Permission Page' }]
  },
  component: PermissionSingleComponent
}];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgUploaderModule
  ],
  declarations: [PermissionSingleComponent],
  providers: [AuthService]

})
export class PermissionSingleModule { }
