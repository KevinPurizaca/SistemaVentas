import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';



@NgModule({
  imports: [RouterModule.forChild([
    {path:'Listar',loadChildren:()=>import('src/app/vistasAdmin/Ventas/listar/listar.module').then(m => m.ListarModule),canActivate:[AuthGuard] },
    {path:'Detalle-Venta/:id',loadChildren:()=>import('src/app/vistasAdmin/Ventas/detalle_venta/detalle-venta.module').then(m => m.DetalleVentaModule),canActivate:[AuthGuard]}
 
  ])],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
