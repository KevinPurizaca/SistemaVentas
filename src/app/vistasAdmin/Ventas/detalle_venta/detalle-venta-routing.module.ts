import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Detalle_ventaComponent } from './detalle_venta.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component:Detalle_ventaComponent}
  ])],
  exports: [RouterModule]
})
export class DetalleVentaRoutingModule { }
