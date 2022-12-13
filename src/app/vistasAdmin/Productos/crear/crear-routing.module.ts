import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: CrearComponent }
  ])],
  exports: [RouterModule]
})
export class CrearRoutingModule { }
