import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilialComponent } from './list-filial.component';

describe('ListFilialComponent', () => {
  let component: ListFilialComponent;
  let fixture: ComponentFixture<ListFilialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFilialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
