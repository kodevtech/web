import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthService } from '../../shared/auth/auth.service';


const routes: Routes = [{
  path: '',
  data: {
    title: 'Users Page',
    urls: [{ title: 'Companies', url: '/company' }, { title: 'Users' }]
  },
  component: UserComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserComponent],
  providers: [AuthService]
})

export class UserModule {
}
