import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem, MessageService } from 'primeng/api';

import { ComboModel } from 'src/app/core/util/combo';
import { Categoria_Producto } from 'src/app/vistasAdmin/Model/Categoria_Producto';
import { Marcaproducto } from 'src/app/vistasAdmin/Model/MarcaProducto';
import { Producto } from 'src/app/vistasAdmin/Model/Producto';
import { Proveedor } from 'src/app/vistasAdmin/Model/Proveedor';
import { CategoriaproductoService } from 'src/app/vistasAdmin/Services/Categoria_Producto.service';
import { MarcaproductoService } from 'src/app/vistasAdmin/Services/marcaproducto.service';
import { ProductoService } from 'src/app/vistasAdmin/Services/Producto.service';
import { ProveedoresService } from 'src/app/vistasAdmin/Services/Proveedores.service';
import { TemporalesService } from 'src/app/vistasAdmin/Services/temporales.service';

@Component({
  selector: 'app-tab-datos',
  templateUrl: './tab-datos.component.html',
  styleUrls: ['./tab-datos.component.css']
})
export class TabDatosComponent implements OnInit {

  letrasPattern="[a-zA-Z ]*"
  numerosPattern="[0-9]*"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  letrasynros="[a-zA-Z0-9 ]*"

  nombre='PRODUCTO INOPUT'
  productocreado?:{}={}
  categorias:Categoria_Producto[]=[]
  marca:Marcaproducto[]=[]
  marca2: Marcaproducto | undefined;
  lstecatcb: ComboModel[]=[];
  lstmarcacb:ComboModel[]=[]
  proveedor:Proveedor[]=[]
 // producto: Producto[] = [];

  producto: Producto = new Producto();
  
  acceptedFiles = '.jpeg,.jpg,.png';
  items: MenuItem[] | undefined;
 // productocreado:{}={}


  uploadedFiles: any[] = [];
  httpHeaders: any;
  subir:string=""
  formBusqueda: FormGroup;
  req={
    indice:0,
    limite:10,
    id_estado:1

  }
  req2={
    indice:0,
    limite:10,
  }

  index: number = 0;


  constructor(
    fb: FormBuilder,
    private catService:CategoriaproductoService,
    public temporal:TemporalesService,
    private marService:MarcaproductoService,
    private messageService: MessageService,
    private provService:ProveedoresService,
    private sanitizer: DomSanitizer,
  ) { 
    this.formBusqueda = fb.group({

      cboCategoria: [-1],
      cboMarca: [-1],

      cboProveedor: [-1],
      txtNombre: [''],
      txtPrecio: [''],
      txtStock: [''],
     });

  }

  ngOnInit() {

    this.getProveedores(this.req2)
    this.getCategorias(this.req)
    this.getMarca(this.req)
    console.log("tab datos");

  }
  getCategorias(req:any){

    // this.catService.getAll(req).subscribe(data=>{
    //   if(!data){
    //     return            
    //    }
    // this.categorias = data   

    // })
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

  // capturarimg(event: any) {
  //   const archivoCapturado = event.target.files[0];
  
  //   //primero elimino la imagen existente
  //   this.uploadedFiles.splice(archivoCapturado);
  //   //despues agrego el archivo capturado
  //   this.uploadedFiles.push(archivoCapturado);
  // //  console.log(this.uploadedFiles);
  // }

  leerimagenes(event:any){

    this.uploadedFiles.splice(event.files);
    for(let file of event.files) {
      this.extraerBase64(file).then((imagen: any) => {
          this.uploadedFiles.push(imagen.base);
       });
   
    //  console.log(this.uploadedFiles);
  }

  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});


  }
  img1="https://dojiw2m9tvv09.cloudfront.net/74275/product/X_thunderx3-tc5-tegc-2042101-g1-neon-green-16103.png?44"
  img2="https://dojiw2m9tvv09.cloudfront.net/74275/product/X_thunderx3-tc5-tegc-2042101-g1-neon-green-25879.png?44"
  img3="https://dojiw2m9tvv09.cloudfront.net/74275/product/X_thunderx3-tc5-tegc-2042101-g1-neon-green-36107.png?44"
  
//   guardarproducto(){
//     localStorage.removeItem("Productos");

//     let value = this.formBusqueda.value
//     let file = this.uploadedFiles

//     this.productocreado={
//       nombre:value.txtNombre,
//       id_categoria:value.cboCategoria,
//       nombre_categoria:value.cboCategoria.nombre,
//       id_marca:this.lstmarcacb,
//       id_marca2:value.cboMarca,
//       nombreMarca:this.marca2,
//       id_proveedor:value.id,
//       precio:value.txtPrecio,
//       stock:value.txtStock,
//       img1:file[0],
//       img2:file[1],
//       img3:file[2]
//     }
//     localStorage.setItem("Productos",JSON.stringify(this.productocreado) );
//   // console.log( "tab-datos",this.productocreado);
//   // console.log("marca2",this.marca2);
//    //this.openNext()
// //    console.log(file);
//   }

  guardarProductos(producto:Producto){
    let file = this.uploadedFiles
    producto.img1=file[0],
    producto.img2=file[1],
    producto.img3=file[2]
    this.temporal.agregarProductoTemporal(producto)
    console.log("Producto Agregado Exitosamente",producto);
  }












  // cargarconsola(){
  //   // this.productosconsola=  JSON.parse(localStorage.getItem("Productos")) ;
  //    this.descripcionsconsola=localStorage.getItem("Descripcion");
  //    this.productosconsola =localStorage.getItem("Productos");
   
  //   let productos = JSON.parse(this.productosconsola)
  //   let descripcion = JSON.parse(this.descripcionsconsola)
   
  //   this.descripcionsconsola = descripcion
  //   this.productosconsola = productos
  //  let value=this.formBusqueda.value

  //  value.txtNombre=productos.nombre
  
  //   // console.log(this.descripcionsconsola);
  //   // console.log(this.descripcionsconsola.desc1);

   
  //  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsageImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsageImg);
        const reader = new FileReader();

        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (error) {}
    });





}

