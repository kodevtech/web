import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { CompanySingleComponent } from './company-single.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Company Page',
    urls: [{ title: 'Company Page', url: '/company' }, { title: 'Company Page' }]
  },
  component: CompanySingleComponent
}];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompanySingleComponent],
  providers: [AuthService]
})

export class CompanySingleModule { }
