import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { SignupComponent } from './Views/signup/signup.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { HomeComponent } from './Views/home/home.component';
import { EditProfileComponent } from './Views/edit-profile/edit-profile.component';
import { CompareCompanyComponent } from './Views/User/compare-company/compare-company.component';
import { SearchCompanyComponent } from './Views/User/search-company/search-company.component';
import { ImportExcelComponent } from './Views/Admin/import-excel/import-excel.component';
import { ManageCompanyComponent } from './Views/Admin/manage-company/manage-company.component';
import { UpdateIPOComponent } from './Views/Admin/update-ipo/update-ipo.component';
import { AuthGuard } from './Guards/auth.guard';
import { NavbarComponent } from './Views/navbar/navbar.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},

  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: EditProfileComponent, canActivate: [AuthGuard]},

  // user
  {path: 'user/company', component: CompareCompanyComponent, canActivate: [AuthGuard]},
  {path: 'user/search', component: SearchCompanyComponent, canActivate: [AuthGuard]},

  // admin
  {path: 'admin/excel', component: ImportExcelComponent, canActivate: [AuthGuard]},
  {path: 'admin/company', component: ManageCompanyComponent, canActivate: [AuthGuard]},
  {path: 'admin/ipos', component: UpdateIPOComponent, canActivate: [AuthGuard]},

  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
