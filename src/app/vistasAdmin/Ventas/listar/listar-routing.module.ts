import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component:ListarComponent}
  ])],
  exports: [RouterModule]
})
export class ListarRoutingModule { }
