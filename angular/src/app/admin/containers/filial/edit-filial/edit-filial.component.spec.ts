import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilialComponent } from './edit-filial.component';

describe('EditFilialComponent', () => {
  let component: EditFilialComponent;
  let fixture: ComponentFixture<EditFilialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFilialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
