import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    DirectivesModule,
    PipesModule
  ]
})
export class SharedCommonsModule { }
