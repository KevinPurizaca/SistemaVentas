import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DescripcionProducto } from 'src/app/vistasAdmin/Model/DescripcionProducto';
import { TemporalesService } from 'src/app/vistasAdmin/Services/temporales.service';

@Component({
  selector: 'app-tab-descripcion',
  templateUrl: './tab-descripcion.component.html',
  styleUrls: ['./tab-descripcion.component.css']
})
export class TabDescripcionComponent implements OnInit {


  formBusqueda: FormGroup;

  descripcionCreado:{}={}
  descripcion:DescripcionProducto= new DescripcionProducto()
  constructor( fb: FormBuilder,
              private temporal:TemporalesService) { 

    this.formBusqueda = fb.group({
      
      txtResumen: [''],
      txtDesc1: [''],
      txtDesc2: [''],
      txtDesc3: [''],
      txtDesc4: [''],
      txtDesc5: [''],
      txtDesc6: [''],
      txtDesc7: [''],
      txtDesc8: [''],

    //  txtApellidoPaterno: ['',[Validators.pattern(this.letrasPattern)]],
     // txtApellidoMaterno: ['',[Validators.pattern(this.letrasPattern)]],
    });

  }

  ngOnInit() {
   
  }
  // guardarDescripcion2(){
  //   localStorage.removeItem("Descripcion");
  //   let value = this.formBusqueda.value
    
  //   this.descripcionCreado={
  //     resumen:value.txtResumen,
  //     desc1:value.txtDesc1,
  //     desc2:value.txtDesc2,
  //     desc3:value.txtDesc3,
  //     desc4:value.txtDesc4,
  //     desc5:value.txtDesc5,
  //     desc6:value.txtDesc6,
  //     desc7:value.txtDesc7,
  //     desc8:value.txtDesc8,
   
  //   }
  //   localStorage.setItem("Descripcion",JSON.stringify(this.descripcionCreado) );
  // }

  guardarDescripcion(descripcion:DescripcionProducto){

    this.temporal.agregarDescripcionTemporal(descripcion)
    console.log("Descripcion Agregado Exitosamente",descripcion);
  }

}


