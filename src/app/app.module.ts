import { CommonModule } from '@angular/common';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { AuthModule } from './vistasAdmin/Login/auth.module';
import { DashboardModule } from './vistasAdmin/Dashboard/dashboard.module';


import { TabMenuModule } from 'primeng/tabmenu';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    DashboardModule,
    BrowserAnimationsModule,
    AuthModule, 
    SharedModule,
    TabMenuModule,
//    AngularFireStorageModule

  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
