import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { SharedModule } from './shared/shared/shared.module';
import { BodyComponent } from './vistasAdmin/Dashboard/body/body.component';
import { MenuComponent } from './vistasAdmin/Dashboard/menu/menu.component';
import { VistaComponent } from './vistasAdmin/Dashboard/vista/vista.component';
import { LoginComponent } from './vistasAdmin/Login/login/login.component';
import { PagenotfoundComponent } from './vistasAdmin/Login/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },

  {
    path: '', component: VistaComponent,
    children: [
      {
        path: 'Productos',
        loadChildren: () => import('./vistasAdmin/Productos/productos.module').then(m => m.ProductosModule), canActivate: [AuthGuard]
      },
      {
        path: 'Categorias',
        loadChildren: () => import('./vistasAdmin/Categorias/categorias.module').then(m => m.CategoriasModule), canActivate: [AuthGuard]
      },
      {
        path: 'Usuarios',
        loadChildren: () => import('./vistasAdmin/Usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [AuthGuard]
      },
      {
        path: 'DetalleProductos',
        loadChildren: () => import('./vistasAdmin/Detalle_Productos/detalle-productos.module').then(m => m.DetalleProductosModule), canActivate: [AuthGuard]
      },
      {
        path: 'Ventas',
        loadChildren: () => import('./vistasAdmin/Ventas/ventas.module').then(m => m.VentasModule), canActivate: [AuthGuard]
      },
    
    ]
  },


  { path: 'notfound', component: PagenotfoundComponent },
  { path: 'Login', component: LoginComponent },
  { path: '**', redirectTo: 'notfound' },

]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
   
})
export class AppRoutingModule { }
