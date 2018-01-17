import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'verify', loadChildren: './verify/verify.module#VerifyModule'},
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: '404', loadChildren: './error/error.module#ErrorModule' },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }
