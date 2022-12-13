/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabImagenesComponent } from './tab-imagenes.component';

describe('TabImagenesComponent', () => {
  let component: TabImagenesComponent;
  let fixture: ComponentFixture<TabImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
