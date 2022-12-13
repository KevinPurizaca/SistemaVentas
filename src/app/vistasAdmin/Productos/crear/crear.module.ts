import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRoutingModule } from './crear-routing.module';
import {CrearComponent } from './crear.component'
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TabImagenesComponent } from './tab-imagenes/tab-imagenes.component';
import { TabDatosComponent } from './tab-datos/tab-datos.component';
import { TabDescripcionComponent } from './tab-descripcion/tab-descripcion.component';
import { TabVistaPreviaComponent } from './tab-vista-previa/tab-vista-previa.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    CrearComponent,
    TabImagenesComponent,
    TabDatosComponent,
    TabDescripcionComponent,
    TabVistaPreviaComponent],
  imports: [
    CommonModule,
    CrearRoutingModule,
    SharedModule,
    InputTextareaModule
  ]
})
export class CrearModule { }
