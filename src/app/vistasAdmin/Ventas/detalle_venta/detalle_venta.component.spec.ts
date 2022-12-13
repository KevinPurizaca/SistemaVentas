/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Detalle_ventaComponent } from './detalle_venta.component';

describe('Detalle_ventaComponent', () => {
  let component: Detalle_ventaComponent;
  let fixture: ComponentFixture<Detalle_ventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalle_ventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalle_ventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
