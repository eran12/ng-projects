import { Component, OnInit } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { ScattegoriesTable } from '../../../models/scattegories-table';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-table-scattegories',
  templateUrl: './table-scattegories.component.html',
  styleUrls: ['./table-scattegories.component.scss']
})
export class TableScattegoriesComponent implements OnInit {

  public rows: ScattegoriesTable[] = [new ScattegoriesTable()];

  public isEditable = true;

  public isAddingRowsEditable = true;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const tableFromStorage = this.localStorageService.getUserScattegorieTableDemoData();
    if (isNotNullOrUndefined(tableFromStorage)) {
      this.rows = tableFromStorage;
    }
  }

  public saveTable(): void {
    this.localStorageService.setUserScattegorieTableDemoData(this.rows);
  }
}
