import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComboModel } from 'src/app/core/util/combo';
import { Categoria_Producto } from '../../Model/Categoria_Producto';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { CategoriaproductoService } from '../../Services/Categoria_Producto.service';
import { MarcaproductoService } from '../../Services/marcaproducto.service';
import {MenuItem} from 'primeng/api';
import { ProductoService } from '../../Services/Producto.service';
import { Proovedor } from '../../Model/Proveedor';
import { ProveedoresService } from '../../Services/Proveedores.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [MessageService ]
})
export class CrearComponent implements OnInit {

 index:number=0
nombre='PRODUCTO INOPUT'

  categorias:Categoria_Producto[]=[]
  marca:Marcaproducto[]=[]

  lstecatcb: ComboModel[]=[];
  lstmarcacb:ComboModel[]=[]
  proveedor:Proovedor[]=[]

  rangeValues: number[] = [20,80];

  val2: number=0;
  val3: number=0;
  acceptedFiles = '.jpeg,.jpg,.png';
  items: MenuItem[] | undefined;

  req={
    indice:0,
    limite:10,
    id_estado:1

  }
  req2={
    indice:0,
    limite:10,
  }
  constructor(
    private catService:CategoriaproductoService,
    public productoService:ProductoService,
    private marService:MarcaproductoService,
    private messageService: MessageService,
    private provService:ProveedoresService,
  ) { }

  ngOnInit() {

  

    this.getCategorias(this.req)
    this.getMarca(this.req)
    this.getProveedores(this.req2)


  }
  getCategorias(req:any){

    this.catService.getAll(req).subscribe(data=>{
      if(!data){
        return            
       }
    this.categorias = data   

    })
  }
  getMarca(req:any){
    this.marService.getAll(req).subscribe(data=>{
      if(!data){
        return
      }
      this.marca=data
    })
  }

  getProveedores(req:any){
   
    this.provService.getAll(req).subscribe(data=>{
      if(!data){
        return
      }
      let result = data.filter(x=> x.estado==1)
      this.proveedor=result
   //   console.log("Proveedor",result);
    })
  }
  leerinput(event: any,data: any){
    this.val2= event.value

  }




}
