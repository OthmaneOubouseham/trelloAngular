import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineFormComponent } from './components/inlineForm/inlineForm.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [InlineFormComponent],
  exports: [InlineFormComponent],
})

export class InlineFormModule {}