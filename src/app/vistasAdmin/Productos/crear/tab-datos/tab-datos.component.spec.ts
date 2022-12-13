/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabDatosComponent } from './tab-datos.component';

describe('TabDatosComponent', () => {
  let component: TabDatosComponent;
  let fixture: ComponentFixture<TabDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
