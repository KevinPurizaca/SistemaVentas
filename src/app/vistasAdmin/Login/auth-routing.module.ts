import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
