import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilialComponent } from './add-filial.component';

describe('AddFilialComponent', () => {
  let component: AddFilialComponent;
  let fixture: ComponentFixture<AddFilialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFilialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
