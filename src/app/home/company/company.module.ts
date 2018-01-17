import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { AuthService } from '../../shared/auth/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Companies Page',
    urls: [{ title: 'Company', url: '/company' }, { title: 'Companies Page' }]
  },
  component: CompanyComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
  ],
  declarations: [CompanyComponent],
  providers: [AuthService]
})

export class CompanyModule { }
