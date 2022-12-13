import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    
    LoginRoutingModule,

    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,

    PasswordModule,
    BrowserModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    SharedModule
  ]
})
export class LoginModule { }
