import {  ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {BlockUIModule} from 'primeng/blockui';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StepsModule } from 'primeng/steps';


import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import {  TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import {RippleModule} from 'primeng/ripple';
import {MenuItem} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DropdownModule,
    TableModule,
    SliderModule,

    BlockUIModule,
    ImageModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    FileUploadModule,
    MultiSelectModule,
    RippleModule,
    CheckboxModule,
    PaginatorModule,
    TabMenuModule,
    InputTextareaModule,
    PasswordModule,
    AutoCompleteModule,
    HttpClientModule

    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DropdownModule,
    TableModule,
    SliderModule,
    ImageModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    BlockUIModule,
    PaginatorModule,
    PasswordModule,
    FileUploadModule,
    StepsModule,
    MultiSelectModule,
    CheckboxModule,
    PaginatorModule,
    AutoCompleteModule,
    CalendarModule,
    TabViewModule,


    
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
 }
