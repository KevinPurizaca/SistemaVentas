import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { VistaComponent } from './vista/vista.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
       MenuComponent,
       VistaComponent,
       BodyComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    RippleModule,
    RouterModule, 
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    SharedModule
  ],
  exports: [VistaComponent]
})
export class DashboardModule { }
