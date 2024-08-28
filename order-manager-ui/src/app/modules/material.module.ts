import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  exports: [MatTableModule, MatButtonModule, MatIconModule, MatSortModule]
})
export class MaterialModule { }
