import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import { navbarData } from './nav-data';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { UsuarioService } from 'src/app/vistasAdmin/Services/Usuario.service';



interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

interface oculto{
  oculto:boolean;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations:[
    trigger('rotate',[
      transition(':enter',[
        animate('700ms',
          keyframes([
            style({transform:'rotate(0deg)',offset:'0'}),
            style({transform:'rotate(2turn)',offset:'1'}),

          ])
        )
      ])
    ])
  ],
  providers: [ConfirmationService]
  
})
export class MenuComponent implements OnInit {


  logo:string="https://firebasestorage.googleapis.com/v0/b/proyectofinal6tociclo.appspot.com/o/extras%2Flogo.jpg?alt=media&token=69e2cec4-5009-469d-a9b6-0e1d05aa3c8c"

  @Output() onToggleSidenav:EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize',['$event'])
  onresize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSidenav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth})
    }
  }

  nombre:string="";
  imagen:string =""
  apellido_p:string= ""
  apellido_m:string= ""

  oculto=true;
  collapsed=false;
  screenWidth =0;
  navData =navbarData;

  constructor(
    private http:UsuarioService,
    private auth:AuthService,
    private router:Router ,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.screenWidth = window.innerWidth;



    let userdata =     JSON.parse(localStorage.getItem('userdata') || '');

    if(userdata.nombres !== null) {
      this.nombre = `${userdata[0].nombre} ${userdata[0].apellido_p}`;
      this.imagen = `${userdata[0].imagen}`
    }

  }


  toggleCollapse():void{
    this.collapsed =!this.collapsed;
    this.onToggleSidenav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth})
  }
  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth})
  }

  token:string=""




        confirm1(){  


        
        this.http.logout()
        //localStorage.removeItem('Token');
        this.router.navigate(['Login']);    
        }


      

      logout() {
        this.confirmationService.confirm({
            message: '¿Seguro Que Deseas Cerrar Sesion?',
            header: 'Cerrar Sesion',
            icon: 'pi pi-sign-out',            
            acceptLabel:'Si',
            rejectLabel:'No',
            accept: () => {



                this.messageService.add({key:'tst',severity:'info', summary:'Sesion Cerrada', detail:'Usted a Cerrado Sesion'});
                this.http.logout()
                this.router.navigate(['Login']);  
              },
            reject: (type: any) => {
                switch(type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({key:'tst',severity:'error', summary:'Cancelado', detail:'Accion Cancelada'});
                    break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({key:'tst',severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                    break;
                }
            }
        });
      }
      

    }



