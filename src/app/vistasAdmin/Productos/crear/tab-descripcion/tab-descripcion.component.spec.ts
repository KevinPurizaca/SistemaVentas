/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabDescripcionComponent } from './tab-descripcion.component';

describe('TabDescripcionComponent', () => {
  let component: TabDescripcionComponent;
  let fixture: ComponentFixture<TabDescripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDescripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
