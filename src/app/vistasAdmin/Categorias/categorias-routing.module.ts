import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'Listar', loadChildren: () => import('./listar/listar.module').then(m => m.ListarModule) , canActivate: [AuthGuard] },
    { path: 'Editar', loadChildren: () => import('./crear/crear.module').then(m => m.CrearModule), canActivate: [AuthGuard]  }

 
  ])],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
