import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleVentaRoutingModule } from './detalle-venta-routing.module';
import { Detalle_ventaComponent } from './detalle_venta.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [Detalle_ventaComponent],
  imports: [
    CommonModule,
    DetalleVentaRoutingModule,
    SharedModule
  ]
})
export class DetalleVentaModule { }
