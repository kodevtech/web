import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../shared/auth/auth.service';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminSingleComponent } from './admin-single.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Admin Page',
    urls: [{title: 'Admin Page', url: '/admin'}, {title: 'Admin Page'}]
  },
  component: AdminSingleComponent
}];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgUploaderModule
  ],
  declarations: [AdminSingleComponent],
  providers: [AuthService]

})
export class AdminSingleModule { }
