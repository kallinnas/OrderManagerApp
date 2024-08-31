import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { OrderDtoGetAll } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class FilterService {

  onFilterChanges(filterControl: FormControl, dataSource: any) {
    return filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.applyFilter(value || '', dataSource)));
  }

  applyFilter(filterValue: string, dataSource: any): any[] {
    const filterValueLowerCase = filterValue.trim().toLowerCase();
    dataSource.filterPredicate = (data: any) => this.isOrderContains(data, filterValueLowerCase);
    dataSource.filter = filterValueLowerCase;
    return dataSource.filteredData;
  }

  private isOrderContains(order: OrderDtoGetAll, filter: string): boolean {
    // returns true in case if order properies include filter value
    return Object.values(order).some(value => {
      return this.isValueIncludesFilter(value, filter);
    });
  }

  getPropertyValue(option: any, filterControl: FormControl): string | null {
    const filter = filterControl.value?.toLowerCase().trim() || '';
  
    // Find the full property value that includes the filter to display in autocomplete
    const matchedValue = Object.values(option).find((value) =>
      this.isValueIncludesFilter(value, filter)
    );
  
    return matchedValue ? matchedValue.toString() : null; // Return null if no match is found
  }
  

  private isValueIncludesFilter(value: any, filter: string): boolean {
    if (value !== undefined && value !== null && value !== '') {
      return value.toString().toLowerCase().includes(filter);
    } return false;
  }

}
