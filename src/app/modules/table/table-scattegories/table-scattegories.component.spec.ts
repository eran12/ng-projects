import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableScattegoriesComponent } from './table-scattegories.component';

describe('TableScattegoriesComponent', () => {
  let component: TableScattegoriesComponent;
  let fixture: ComponentFixture<TableScattegoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableScattegoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableScattegoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
