import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  exports: [MatTableModule, MatButtonModule, MatIconModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  ]
})
export class MaterialModule { }
