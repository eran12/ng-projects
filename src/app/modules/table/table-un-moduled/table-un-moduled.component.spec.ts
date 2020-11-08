import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUnModuledComponent } from './table-un-moduled.component';

describe('TableUnModuledComponent', () => {
  let component: TableUnModuledComponent;
  let fixture: ComponentFixture<TableUnModuledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUnModuledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUnModuledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
