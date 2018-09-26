import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatToolbarModule
} from "@angular/material";
import {DraggableDirective} from '../components/draggable/draggable.directive';

@NgModule({
  imports: [],
  declarations: [
    DraggableDirective
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatAutocompleteModule,
    DraggableDirective
  ]
})
export class SharedModule {}
