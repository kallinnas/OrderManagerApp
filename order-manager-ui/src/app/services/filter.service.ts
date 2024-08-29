import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {

  onFilterChanges(filterControl: FormControl, dataSource: any) {
    return filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.applyFilter(value || '', dataSource)));
  }

  applyFilter(filterValue: string, dataSource: any): any[] {
    const filterValueLowerCase = filterValue.trim().toLowerCase();   
    dataSource.filterPredicate = (data: any) => this.objectContains(data, filterValueLowerCase);
    dataSource.filter = filterValueLowerCase;
    return dataSource.filteredData;
  }

  private objectContains(obj: any, filter: string): boolean {
    // returns true in case if object properies include filter value
    return Object.values(obj).some(value => {
      const transformedValue = value?.toString().toLowerCase();
      return transformedValue?.includes(filter);
    });
  }

  getPropertyValue(option: any, filterControl: FormControl): string {
    const filter = filterControl.value?.toLowerCase().trim() || '';
    // searching for full object values include filter to display in ac options
    return Object.values(option).find(value => {
      if (value !== undefined && value !== null && value !== '' && isNaN(+value)) {
        return value.toString().toLowerCase().includes(filter);
      }
      return false;
    })?.toString() || '';
  }

}
