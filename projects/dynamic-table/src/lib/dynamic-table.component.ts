import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumns } from './table-columns';

/**
 * @whatItDoes declare generic component for tables.
 *             when entity has a list field, its component will hold a table template and
 *             pass it the data. the table component should support sorting, pagination, scrolling - x/y,
 *             selection row event.
 * @export TablesComponent
 */
@Component({
  selector: 'lib-dynamic-table',
  template: `
    <table class="table table-hover table-bordered table-responsive">
      <thead>
      <tr>
        <th *ngIf="showEditButtons">
          <button type="button" class="btn btn-default btn-circle" (click)="addRow()" id="addRowBtn"><i class="glyphicon glyphicon-plus"></i>
          </button>
        </th>
        <th *ngFor="let col of tableCols">{{col.displayName}}</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let formRow of rowsFormGroup; index as i">
        <th *ngIf="showEditButtons">
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-circle" (click)="deleteRow(i)" id="removeRowBtn"><i class="glyphicon glyphicon-minus"></i>
            </button>
          </div>
        </th>

        <ng-container *ngIf="tableCols.length > 0">
          <td *ngFor="let col of tableCols">
            <div *ngIf="formRow.controls.hasOwnProperty(col.property)">
              <form [formGroup]="formRow">
                <input type="text" formControlName="{{col.property}}" [disabled]="inputsDisable"/>
              </form>
            </div>
          </td>
        </ng-container>
      </tr>
      </tbody>
    </table>
  `
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  /**
   * Receive list data from parent component.
   */
  @Input() public tableRows: [any];

  /**
   * Receive list of columns titles for the table header.
   * Only given columns displayName will be present.
   */
  @Input() public tableCols: TableColumns[] = [];

  /**
   * Enabled or disabled the inputs in the table for editing.
   */
  @Input() public inputsDisable = true;

  /**
   * Enabled the input field in the given column displayName.
   */
  @Input() public columnsToEnabled: string[] = [];

  /**
   * Indicates if to show the add or delete (+/-) buttons.
   */
  @Input() public showEditButtons = false;

  /**
   * List that contains all of the row form controls.
   * Each input field in the row will be a form controller.
   */
  public rowsFormGroup: FormGroup[] = [];

  /**
   * Subject for unsubscribe from all observables when component destroy.
   */
  private stop$ = new Subject<void>();

  /**
   * Holder for the first row in table so we can add another rows.
   */
  private rowInit;

  constructor() {
  }

  public ngOnInit(): void {
    this.initTables();
  }

  /**
   * Unsubscribe from all the controllers subscription in order to prevent memory leak.
   */
  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  /**
   * Initial the tableCols, if it`s empty by iterating over the keys in the tableRows.
   * If the tableCols has values only this values will be present.
   *
   * Also we initialize also the rowFormGroup and populate it if the are values.
   * If there are no values the value by default will be an empty string.
   */
  public initTables(): void {
    // create the tableCol if none is given.
    if (this.tableRows.length > 0 && this.tableCols.length === 0) {
      const row = this.tableRows[0];
      for (const rowKey in row) {
        if (row.hasOwnProperty(rowKey)) {
          this.tableCols.push({displayName: rowKey, property: rowKey});
        }
      }
    }

    // Registering the table rows.
    for (let i = 0; i < this.tableRows.length; i++) {
      this.rowsFormGroup.push(this.createFormGroupRow(this.tableRows[i]));
      this.tableRows[i] = this.rowsFormGroup[i].getRawValue();
      this.subscribeFormControlsRowValue(i);
      if (i === 0) {
        this.rowInit = this.tableRows[i];
      }
    }
  }

  /**
   * Add new empty row to the table and subscribe to changes.
   */
  public addRow(): void {
    const newRow = this.createNewEmptyFormGroupRow();
    if (newRow != null) {
      this.rowsFormGroup.push(newRow);
      const index = this.rowsFormGroup.length - 1;
      this.tableRows.push(this.rowsFormGroup[index].getRawValue());
      this.subscribeFormControlsRowValue(index);
    }
  }

  /**
   * Delete the row from the tableRows and rowsFormGroup.
   */
  public deleteRow(index): void {
    this.tableRows.splice(index, 1);
    this.rowsFormGroup.splice(index, 1);
  }

  /**
   * Create new form group row from the table and patch the values to the input field.
   * The row is build from the row in the {@link tableRows}, by iterating over the row keys.
   * If the {@link inputsDisable} flag if it set to false all the inputs will be disabled.
   * otherwise check the {@link columnsToEnabled} for any fields that need to be disabled.
   *
   * @see columnsToDisable
   * @see tableRows
   * @see inputsDisable
   */
  private createFormGroupRow(row): FormGroup {
    const group = {};
    if (row == null) {
      return;
    }
    for (const rowKey in row) {
      if (row.hasOwnProperty(rowKey)) {
        group[rowKey] = new FormControl(
          {
            value: this.checkValue(row[rowKey]),
            disabled: this.checkForInputDisable(rowKey)
          },
          {updateOn: 'change'}
        );
      }
    }
    return new FormGroup(group);
  }

  /**
   * Create new row in the table with empty values.
   * The row is build from the last row in the {@link tableRows}, by iterating over the row keys.
   * If the {@link inputsDisable} flag if it set to false all the inputs will be disabled.
   * otherwise check the {@link columnsToEnabled} for any fields that need to be disabled.
   *
   * @see columnsToDisable
   * @see tableRows
   * @see inputsDisable
   */
  private createNewEmptyFormGroupRow(): FormGroup {
    const group = {};
    const row = this.rowInit;
    if (row != null) {
      for (const rowKey in row) {
        if (row.hasOwnProperty(rowKey)) {
          group[rowKey] = new FormControl(
            {value: '', disabled: this.checkForInputDisable(rowKey)},
            {updateOn: 'change'});
        }
      }
      return new FormGroup(group);
    }
  }

  /**
   * If {@link inputsDisable} sets to false then it ignore {@link columnsToEnabled}
   * @param {string} rowKey
   * @return {boolean}
   * @private
   */
  private checkForInputDisable(rowKey: string): boolean {
    if ((this.inputsDisable && this.columnsToEnabled.length > 0)) {
      return !this.columnsToEnabled
        .find(colName => colName.toLocaleLowerCase() === rowKey.toLocaleLowerCase());
    } else {
      return this.inputsDisable;
    }
  }

  /**
   * Subscribe to the input changes in the row and insert the value to the tableRows.
   * @param rowIndex - the index of the row in the form group.
   */
  private subscribeFormControlsRowValue(rowIndex: number): void {
    const formGroupValue: Map<string, AbstractControl> = this.rowsFormGroup[rowIndex].value;
    for (const formKey in formGroupValue) {
      if (formGroupValue.hasOwnProperty(formKey)) {
        if (this.tableRows[rowIndex].hasOwnProperty(formKey)) {
          this.rowsFormGroup[rowIndex].get(formKey)
            .valueChanges
            .pipe(takeUntil(this.stop$))
            .subscribe(controlValue => {
              this.tableRows[rowIndex][formKey] = controlValue;
            });
        }
      }
    }
  }

  /**
   * If the value has type, then it has value! so we return the value.
   * Else an empty string will return
   */
  private checkValue(value: any): any {
    console.log(value);
    console.log(typeof value);
    switch (typeof value) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'object':
        return value;
      default:
        return '';
    }
  }
}
