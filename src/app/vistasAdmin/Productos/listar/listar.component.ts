import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService,ConfirmationService  } from 'primeng/api';
import { Producto } from 'src/app/vistasAdmin/Model/Producto';
import { ProductoService } from 'src/app/vistasAdmin/Services/Producto.service';
import { Categoria_Producto } from '../../Model/Categoria_Producto';

import { CategoriaproductoService } from '../../Services/Categoria_Producto.service';
import { ComboModel } from 'src/app/core/util/combo';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { MarcaproductoService } from '../../Services/marcaproducto.service';

import { PrimeNGConfig } from 'primeng/api';
import { ProveedoresService } from '../../Services/Proveedores.service';
import { Proveedor } from '../../Model/Proveedor';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  styles: [`

`
],
  providers: [ConfirmationService ]

})
export class ListarComponent implements OnInit {
 
  letrasPattern="[a-zA-Z ]*"
  numerosPattern="[0-9]*"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  letrasynros="[a-zA-Z0-9 ]*"


  formBusqueda: FormGroup;
  formProductoEditable: FormGroup;
  loading=true
  bloqueado:boolean=true;
  pi:string=""
  loadingbtn=[false]

  cboCategoria:ComboModel[]=[];

  totalRecord:number=0
  first:number=0
  stock=""
  idDialog:boolean=false;
  submitted: boolean = false;
  limite:number=5;

  req={
    indice:0,
    limite:5,
    estado:-1,
    nombre:'',
    id_marca:-1,
    id_categoria:-1,
    id_proveedor:-1

  }
  
  req2={
    indice:0,
    limite:100,
    estado:-1

  }
  producto:Producto[]=[]
  categorias:Categoria_Producto[]=[]
  marca:Marcaproducto[]=[]
  proveedor:Proveedor[]=[]

  lsproductodto!:Producto;
  lstecatcb: ComboModel[]=[];
  lstmarcacb:ComboModel[]=[]

  producto2:Producto= new Producto()

  constructor(
    fb: FormBuilder,
    fbpe:FormBuilder,
    private httpCore:HttpCoreService,
    private productService:ProductoService,
    private catService:CategoriaproductoService,
    private marService:MarcaproductoService,
    private provService:ProveedoresService,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private _confirmationService: ConfirmationService,
  ) { 


    
    this.formBusqueda = fb.group({

      cboCategoria: [-1],
      cboMarca: [-1],
      cboEstado: [-1],
      cboProveedor: [-1],
      txtNombre: ['',[Validators.pattern(this.letrasPattern)]],
    });

    this.formProductoEditable = fbpe.group({

      cboCategoriadg: [-1],
      cboMarcadg: [-1],
      cboProveedordg: [-1],
      txtNombredg: ['',[Validators.required]],
      txtPreciodg: ['',[Validators.required,Validators.pattern(this.numerosPattern)]],
      txtStockdg: ['',[Validators.required,Validators.pattern(this.numerosPattern)]],
    });

  }

  buscar(){
    const value = this.formBusqueda.value;

    const req ={
          indice:0,
          limite:5,
          estado:-1,
          id_marca: value.cboMarca,
          nombre:'',
          id_categoria:value.cboCategoria,
          id_proveedor:value.cboProveedor
    }
    console.log(req);
    console.log(value.cboMarca);
    this.listarProducto(req);
  } 


  ngOnInit() {
    this.primengConfig.ripple = true;

    this.getCategorias(this.req2)
    this.getMarca(this.req2)
   this.getProveedores(this.req2)
    this.listarProducto(this.req)
  }

  deleteProducto(){   
  }

  limpiarFormulario(){
    this.formBusqueda.controls['cboEstado'].setValue(-1);
    this.formBusqueda.controls['cboMarca'].setValue(-1);
    this.formBusqueda.controls['cboProveedor'].setValue(-1);
    this.formBusqueda.controls['cboCategoria'].setValue(-1);    
    this.formBusqueda.controls['txtNombre'].setValue('');

    this.listarProducto(this.req)
  }

  editProducto(event: Event,item: any){
    this.lsproductodto =item;   
    this.submitted = false;
    this.idDialog = true;
   
  }

  cambiarestado(event:any,item:any){
    this.lsproductodto=item;
    console.log(item);
    try {
      if(item.estado == 1){
      
        const req={
          id:item.id,
          estado:0
        }
        this.productService.cambiarestado(req).subscribe((res:any)=>{
          // if(res.success=false){

          //   console.log("error");
          //   return  
    
        //  }else{
      
            this.listarProducto(this.req)
          //}
        })
     
       
      }
      if(item.estado == 0){
        const req={
          id:item.id,
          estado:1
        }
        this.productService.cambiarestado(req).subscribe((res:any)=>{
          // if(res.success=false){
          //   console.log("error");
            
          //   return  
    
          // }else{


            this.listarProducto(this.req)

        //  }
        })
       

      
        
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  
    
    
  // console.log(item);
  }

changePage(event: any) {
  this.req.indice= event.first ;
  this.req.limite= event.rows;
 
  this.listarProducto(this.req);
  this.first = event.first;
}

listarProducto(req:any){
 
  this.httpCore.post(req,'Producto/Listar').subscribe((res)=>{

    //console.log(res);
    this.producto = res.data  
    this.loading= false;
    this.totalRecord = res.totalregistro;
})
  
  }


    getCategorias(req:any){

      this.catService.getAll(req).subscribe((res:any)=>{
        if(!res){
          return            
         }
     // this.categorias = res.data   
     this.categorias.push({id:-1,nombre:'Seleccione'})
     this.categorias= this.categorias.concat(res.data)
      })


    }
    
    getMarca(req:any){
      this.marService.getAll(req).subscribe((res:any)=>{
        if(!res){
          return
        }
     //   let result = data.filter(x=> x.estado ==1)
      //  this.marca=res.data
      this.marca.push({id:-1,nombre:'Seleccione'})
      this.marca= this.marca.concat(res.data)
      })
    }

    getProveedores(req:any){
   
      this.provService.getAll(req).subscribe((res:any)=>{
        if(!res){
          return
        }
      //  let result = data.filter(x=> x.estado==1)
       // this.proveedor=res.data    
        this.proveedor.push({id:-1,nombrecompletos:'Seleccione'})
        this.proveedor= this.proveedor.concat(res.data)

      })
    }

    hideDialog() {
      this.idDialog = false;
      this.submitted = false;
  }  

  actualizarProducto(req: any){

  this.submitted = true;
  this.idDialog = true;
   let value = this.formProductoEditable.value
   for (let c in this.formProductoEditable.controls) {
    this.formProductoEditable.controls[c].markAsTouched();
}

if(this.formProductoEditable.valid){
  this.producto2={
    "id":this.lsproductodto.id,
    "nombre": value.txtNombredg,
    "id_categoria":value.cboCategoriadg,//falta
    "id_marca":value.cboMarcadg,
    "id_proveedor":value.cboProveedordg,//falta
    "stock":value.txtStockdg,
    "precio":value.txtPreciodg,
  }
console.log(this.producto2);

this.httpCore.post(this.producto2,'Producto/Actualizar/').subscribe(res=>{
  if(!res.isSuccess){
    this.idDialog = true; 
    this.messageService.add({key: 'tst', severity: 'error', summary: 'Error Message', detail: res.innerException, });
    return  
  }
  else{
    this.submitted = false;
    this.idDialog = false; 
    this.listarProducto(this.req)
    this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:res.message });
  }
})

  // this.productService.update(this.producto2).subscribe((res:any) => {
  //     if(res.success=false){

  //     }else{
  //       this.submitted = false;
  //       this.idDialog = false; 
  //       this.listarProducto(this.req)
  //       this.messageService.add({
  //         key: 'tst',
  //         severity: 'info',
  //         summary: 'Confirmado',
  //         detail:
  //             res.message
  //     });
  //     }
  //   }
  //  )
}
}

eliminarProducto(event: Event, item: any) {
  this._confirmationService.confirm({
      key: 'deleteProducto',
      target: event.target || new EventTarget(),
      message: 'Desea eliminar el Producto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          if (item > 0) {
            console.log(item);
              this.productService.delete(item)
                  .subscribe((res: any) => {
                      if (res.success=false) {
                          this.messageService.add({
                              key: 'tst',
                              severity: 'error',
                              summary: 'Error Message',
                              detail:
                                  res.messag,
                          });
                          return;
                      } 
                    else {
                          this.messageService.add({
                              key: 'tst',
                              severity: 'info',
                              summary: 'Confirmado',
                              detail:
                              res.message 
                          });
                          this.listarProducto(this.req)
                      }
                  });
      
          } else {
           
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Rechazado',
              detail: 'Registro no Eliminado',
          });
          }
      },
      reject: () => {
          this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Rechazado',
              detail: 'Registro no Eliminado',
          });
      },
  });
}

}

