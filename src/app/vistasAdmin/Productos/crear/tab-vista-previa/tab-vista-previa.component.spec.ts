/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabVistaPreviaComponent } from './tab-vista-previa.component';

describe('TabVistaPreviaComponent', () => {
  let component: TabVistaPreviaComponent;
  let fixture: ComponentFixture<TabVistaPreviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabVistaPreviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVistaPreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
