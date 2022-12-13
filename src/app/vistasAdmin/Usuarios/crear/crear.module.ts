import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRoutingModule } from './crear-routing.module';
import { CrearComponent } from './crear.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [CrearComponent],
  imports: [
    CommonModule,
    CrearRoutingModule,
    SharedModule
  ]
})
export class CrearModule { }
