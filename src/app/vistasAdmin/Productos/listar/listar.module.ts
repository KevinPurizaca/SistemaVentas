import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarRoutingModule } from './listar-routing.module';
import { ListarComponent } from './listar.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    ListarRoutingModule,
    SharedModule

  ]
})
export class ListarModule { }
