import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModuleComponent } from './dialog-module.component';

describe('DialogModuleComponent', () => {
  let component: DialogModuleComponent;
  let fixture: ComponentFixture<DialogModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
