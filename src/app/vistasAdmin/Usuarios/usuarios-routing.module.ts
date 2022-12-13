import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';



@NgModule({
  imports: [
    RouterModule.forChild([
      {path:'Listar',loadChildren:()=> import ('./listar/listar.module').then(e=>e.ListarModule), canActivate: [AuthGuard] },
      {path:'Crear',loadChildren:()=> import ('./crear/crear.module').then(e=>e.CrearModule), canActivate: [AuthGuard] }

    ])
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
