import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  exports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class MaterialModule { }
