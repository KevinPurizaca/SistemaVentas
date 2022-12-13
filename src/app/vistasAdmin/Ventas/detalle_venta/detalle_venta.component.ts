import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Order_has_products } from 'src/app/vistasAdmin/Model/Order_has_products';
import { Order_has_productsService } from 'src/app/vistasAdmin/Services/Order_has_products.service';

@Component({
  selector: 'app-detalle_venta',
  templateUrl: './detalle_venta.component.html',
  styleUrls: ['./detalle_venta.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class Detalle_ventaComponent implements OnInit {

  loading=true
  totalRecord=0
  order_has:Order_has_products[]=[]
  constructor(
    private orderHasService:Order_has_productsService,
    private activateRouter:ActivatedRoute
  ) { }


  cambiarPagina(){}

  ngOnInit() {
    this.listarDetalleId()
  }

  id:number=1
 /* listarDetalleId(){
    this.orderHasService.getOrdersId(this.id).subscribe(data=>{
      if(!data){
        return
      }
      this.order_has=data;
      console.table(data);
      this.loading=false;
      this.totalRecord=data.length
    })
  }*/
cliente:any
  listarDetalleId(){
    this.activateRouter.params.subscribe(
      e=>{
        let id =e['id'];
        if(id){
          this.orderHasService.getOrdersId(id).subscribe(
            data=>{
              if(!data){
                return
              }
              this.order_has=data;
             // console.table(data);
              this.loading=false;
              this.totalRecord=data.length;
     
              this.cliente=data.map(e=>e.cliente)
              this.cliente = this.cliente[1]
            }
          )
        }
      }
    )
  }

 /* cargarOrder():any{
    this.activaterouter.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.orderService.getOrdersId(id).subscribe(
            es => this.orderhas = es
            
          );
       

        }
      }
    )
  }*/

}
