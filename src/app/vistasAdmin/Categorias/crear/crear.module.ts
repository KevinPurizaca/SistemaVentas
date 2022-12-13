import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRoutingModule } from './crear-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CrearComponent } from './crear.component';


@NgModule({
  declarations: [CrearComponent],
  imports: [
    CommonModule,
    CrearRoutingModule,
    SharedModule
  ]
})
export class CrearModule { }
