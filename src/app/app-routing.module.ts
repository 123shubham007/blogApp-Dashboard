import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  { path : '', component : DashboardComponent, canActivate: [AuthGuard] },
  { path : 'category', component : CategoriesComponent, canActivate: [AuthGuard] },
  { path : 'post', component : AllPostComponent, canActivate: [AuthGuard] },
  { path : 'post/new', component : NewPostComponent, canActivate: [AuthGuard] },
  { path : 'subscribers', component : SubscribersComponent, canActivate: [AuthGuard] },
  { path : 'login', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
