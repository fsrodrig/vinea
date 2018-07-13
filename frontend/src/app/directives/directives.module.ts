import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CuitValidatorDirective,
    DropFilesDirective,
    DisableControlDirective
} from './directives.index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CuitValidatorDirective,
    DropFilesDirective,
    DisableControlDirective
  ],
  exports: [
    CuitValidatorDirective,
    DropFilesDirective,
    DisableControlDirective
  ]
})
export class DirectivesModule { }
