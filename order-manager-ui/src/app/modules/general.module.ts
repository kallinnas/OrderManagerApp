import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  exports:[MaterialModule, CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule]
})
export class GeneralModule { }
