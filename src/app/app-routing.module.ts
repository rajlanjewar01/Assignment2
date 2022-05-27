import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch:'full' },
  { path: 'sign-in', component:SignInComponent },
  { path: 'sign-up', component:SignUpComponent },
  { path: 'registered-user', component:RegisteredUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
