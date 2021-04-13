import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NotebookComponent } from './notebook/notebook.component';
import { NoteComponent } from './note/note.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';
import { HttpClientModule } from '@angular/common/http';

const notebookRoute: Routes = [
  {path: '', component: NoteComponent},
];

@NgModule({
  declarations: [
    NotebookComponent,
    NoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    RouterModule.forChild(notebookRoute)
  ]
})
export class NotebookModule { }
