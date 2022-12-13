import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DescripcionProducto } from 'src/app/vistasAdmin/Model/DescripcionProducto';
import { Producto } from 'src/app/vistasAdmin/Model/Producto';
import { ProductoService } from 'src/app/vistasAdmin/Services/Producto.service';
import { TemporalesService } from 'src/app/vistasAdmin/Services/temporales.service';

@Component({
  selector: 'app-tab-vista-previa',
  templateUrl: './tab-vista-previa.component.html',
  styleUrls: ['./tab-vista-previa.component.css'],
  providers: [MessageService]
})
export class TabVistaPreviaComponent implements OnInit {

  
producto=   this.temporalService.cargarVistaPreviaProducto()
productos:any=[]

descripcion= this.temporalService.cargarVistaPreviaDescripcion()
descripcions:any=[]

  fotogde:string="";


  changeDetectorRef: ChangeDetectorRef;
  changeDetectorRef2: ChangeDetectorRef;


  
  req={
    id:2
   }

  constructor(
    //private productoService:ProductoService,
    private temporalService:TemporalesService,  changeDetectorRef: ChangeDetectorRef,
    private messageService:MessageService,
  
  ) {
    this.changeDetectorRef = changeDetectorRef;
    this.changeDetectorRef2 = changeDetectorRef;
   }

  ngOnInit() {
    this.temporalService.productAdded$.subscribe(data => {
      this.producto = data.productos;
      this.fotogde = this.productos.img1 
      this.changeDetectorRef.detectChanges();
    });
    console.log(" this.producto22", this.producto);
    console.log(" this.producto33", this.productos);
    this.temporalService.descripcionAdded$.subscribe(data => {
      this.descripcion = data.descripcions;
     
      
        this.changeDetectorRef2.detectChanges();
    });




    console.log("tab-vistaprevia")
 //   this.cargarconsola()
  //  this.cargarVistaPrevia()
   // this.cargarproducto(this.req)
  }

  
// cargarconsola(){
//  // this.productosconsola=  JSON.parse(localStorage.getItem("Productos")) ;
//   this.descripcionsconsola=localStorage.getItem("Descripcion");
//   this.productosconsola =localStorage.getItem("Productos");

//  let productos = JSON.parse(this.productosconsola)
//  let descripcion = JSON.parse(this.descripcionsconsola)

//  this.descripcionsconsola = descripcion
//  this.productosconsola = productos

//  console.log(productos);
//  console.log(this.descripcionsconsola);
//  console.log(this.descripcionsconsola.desc1);
//  this.fotogde = productos.img1 

// }

  cambiarimagen(value:any) {
    this.fotogde = value
    this.productos.img1 = this.productos.img1
  
 }
//  cargarVistaPrevia(){

//   this.temporalService.productAdded$ .subscribe(data => {
//     this.producto = data.products;
    
    
//       this.changeDetectorRef.detectChanges();
//   });

//   this.temporalService.descripcionAdded$.subscribe(data => {
//     this.desripcion = data.products;
   
    
//       this.changeDetectorRef.detectChanges();
//   });
//  }

agregarCarrito(){
     this.messageService.add({key: 'tst',severity:'success', summary:'Agregado Al Carrito'});
      
}



}
