import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: LoginComponent }
  ])],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
