import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DescripcionProducto } from '../Model/DescripcionProducto';
import { Producto } from '../Model/Producto';

@Injectable({
  providedIn: 'root'
})
export class TemporalesService {

//PRODUCTO
  id_categoria?:number=0;
  id_marca?:number=0;
  nombre?:string="";
  precio?:string="";
  img1?:string="";
  img2?:string="";
  img3?:string="";
  stock?:number=0;

//DESCRIPCION
 	resumen?:string="";
	desc_1?:string="";	
	desc_2?:string="";	
	desc_3?:string="";	
	desc_4?:string="";	
	desc_5?:string="";	
	desc_6?:string="";	
	desc_7?:string="";	
	desc_8?:string="";	

  id_proveedor?:number=0;   


  producto: Producto[] = [];
  descripcion:DescripcionProducto[]=[]
  private productAddedSource = new Subject<any>();
  private descripcionAddedSource= new Subject<any>();

  productAdded$ = this.productAddedSource.asObservable();
  descripcionAdded$ = this.descripcionAddedSource.asObservable();

  constructor() { }



  agregarProductoTemporal(producto:Producto){
  //  this.producto.splice(0)
    this.producto.push(producto)  

    this.productAddedSource.next({ item: this.producto, nombre: this.nombre,
                                    precio: this.precio,stock:this.stock ,
                                    id_marca:this.id_marca,id_categoria:this.id_categoria,
                                    img1:this.img1,img2:this.img2,img3:this.img1});
  console.log("Producto Servicio",this.producto)

}

agregarDescripcionTemporal(descripcion:DescripcionProducto){
//this.descripcion.splice(0)
this.descripcion.push(descripcion)
// this.descripcionAddedSource.next({ item: this.descripcion, resumen: this.resumen,
//                                    desc1:this.desc_1,desc2:this.desc_2,desc3:this.desc_3,
//                                    desc4:this.desc_4,desc5:this.desc_5,desc6:this.desc_6,
//                                    desc7:this.desc_7,desc8:this.desc_8});
console.log("descri Servicio",this.descripcion)
}

cargarVistaPreviaProducto(){
 // console.log("retornar producto",this.producto);
  return this.producto 
}
cargarVistaPreviaDescripcion(){
 // console.log("retornar descripcion",this.descripcion);
  return this.descripcion
}
}
