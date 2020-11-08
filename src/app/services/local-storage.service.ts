import { Injectable } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { ScattegoriesTable } from '../models/scattegories-table';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userTableDemoData = 'user-table-demo-data';

  constructor() { }

  public getUserScattegorieTableDemoData(): ScattegoriesTable[] | null {
    return this.getItem(this.userTableDemoData);
  }

  public setUserScattegorieTableDemoData(data: ScattegoriesTable[]): void {
    this.setItem(this.userTableDemoData, data);
  }

  public deleteUserScattegorieTableDemoData(): void {
    this.deleteItem(this.userTableDemoData);
  }

  public getUserTableDemoData(): any | null {
    return this.getItem(this.userTableDemoData);
  }

  public setUserTableDemoData(data: any): void {
    this.setItem(this.userTableDemoData, data);
  }

  public deleteUserTableDemoData(): void {
    this.deleteItem(this.userTableDemoData);
  }

  private getItem(itemName: string): any {
    const item = localStorage.getItem(itemName);
    return isNotNullOrUndefined(item) ?
      JSON.parse(item)
      : null;
  }

  private setItem(itemName: string, data: any): void {
    if (isNotNullOrUndefined(data)) {
      localStorage.setItem(itemName, JSON.stringify(data));
    }
  }

  private deleteItem(itemName: string): void {
    localStorage.removeItem(itemName);
  }
}
