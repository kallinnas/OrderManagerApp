import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';



@NgModule({
  exports:[MaterialModule, CommonModule, FlexLayoutModule],
  providers: [DatePipe],
})
export class GeneralModule { }
