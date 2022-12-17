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
  providers: [ConfirmationService,MessageService]
  
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



  nombre=localStorage.getItem ('Nombre')
  imagen =localStorage.getItem ('Imagen')
  apellido_p= localStorage.getItem ('Apellido_p')
  apellido_m= localStorage.getItem ('Apellido_m')

        confirm1(){  

         /* this.confirmationService.confirm({
            message: '¿Sguro que quieres cerrar Sesion?',
            accept: () => {
                     }
        });*/
        
        this.http.logout()
        localStorage.removeItem('Token');
        this.router.navigate(['Login']);    
        }

    /*    confirm1() {
          this.confirmationService.confirm({
              message: 'Are you sure that you want to proceed?',
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
              },
              reject: (type:any) => {
                  switch(type) {
                      case ConfirmEventType.REJECT:
                          this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                      break;
                      case ConfirmEventType.CANCEL:
                          this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                      break;
                  }
              }
          });
      }*/
      

      logout() {
        this.confirmationService.confirm({
            message: '¿Seguro Que Deseas Cerrar Sesion?',
            header: 'Cerrar Sesion',
            icon: 'pi pi-sign-out',            
            acceptLabel:'Si',
            rejectLabel:'No',
            accept: () => {
             // this.http.logout()
              // localStorage.removeItem('Token');
              // localStorage.removeItem('Nombre');
              // localStorage.removeItem('Apellido_p');
              // localStorage.removeItem('Apellido_m');
              // localStorage.removeItem('Telefono');
              // localStorage.removeItem('Correo');
              // localStorage.removeItem('Imagen');
              // localStorage.removeItem('Dni');
            


                this.messageService.add({key:'tst',severity:'info', summary:'Sesion Cerrada', detail:'Usted a Cerrado Sesion'});
                this.http.logout()
                // this.router.navigate(['Login']);  
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



