import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PermissionComponent} from './permission.component';
import {AuthService} from '../../shared/auth/auth.service';
import { NgUploaderModule } from 'ngx-uploader';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Permission Page',
    urls: [{title: 'Permission', url: '/permission'}, {title: 'Permission Page'}]
  },
  component: PermissionComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgUploaderModule
  ],
  declarations: [PermissionComponent],
  providers: [AuthService]
})
export class PermissionModule {
}
