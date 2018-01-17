import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {AuthService} from '../../shared/auth/auth.service';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Home',
    urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Home'}]
  },
  component: DashboardComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent],
  providers: [AuthService]
})
export class DashboardModule {
}
