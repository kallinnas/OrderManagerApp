import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  exports: [MatTableModule, MatButtonModule, MatIconModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatOptionModule,
    MatDatepickerModule, MatNativeDateModule,
  ]
})
export class MaterialModule { }
