import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: 'admin/:id', loadChildren: './admin/admin-single/admin-single.module#AdminSingleModule' },
      { path: 'permission', loadChildren: './permission/permission.module#PermissionModule' },
      { path: 'permission/:id', loadChildren: './permission/permission-single/permission-single.module#PermissionSingleModule' },
      { path: 'company', loadChildren: './company/company.module#CompanyModule' },
      { path: 'company/:id', loadChildren: './company/company-single/company-single.module#CompanySingleModule' },
      { path: 'users/:cid', loadChildren: './user/user.module#UserModule' },
      { path: 'users/:cid/:uid', loadChildren: './user/user-single/user-single.module#UserSingleModule' }
      // { path: 'company/:id/user', loadChildren: './company/company-single/company-single.module#CompanySingleModule' }
      // { path: 'company/:id/user/:uid', loadChildren: './company/company-single/company-single.module#CompanySingleModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
