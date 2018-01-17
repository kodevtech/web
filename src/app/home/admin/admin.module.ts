import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminComponent} from './admin.component';
import {AuthService} from '../../shared/auth/auth.service';
import { NgUploaderModule } from 'ngx-uploader';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Admin Page',
    urls: [{title: 'Admin', url: '/admin'}, {title: 'Admin Page'}]
  },
  component: AdminComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgUploaderModule
  ],
  declarations: [AdminComponent],
  providers: [AuthService]
})
export class AdminModule {
}
