import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NoteService } from '../note.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  currentNotebook: string;
  currentNote: string;

  noteTitles: Array<string>;
  noteItem;

  @ViewChild('inputTitle') inputTitle : ElementRef;
  @ViewChild('inputContent') inputContent : ElementRef;


  constructor(private renderer:  Renderer2, 
            private noteService: NoteService,
            private dialog: MatDialog)             
  {
    this.currentNotebook = "master";
    this.noteItem = null;
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes(){
    this.noteService.getNotes().subscribe(
      res => {
        let notebook = res.find(ele => ele.name == this.currentNotebook);
        if (notebook.notes){
          this.noteTitles = notebook.notes;
        }
      },
      err => this.handleError(err),
    );
  }

  handleError(err){
    console.log({err});
  }

  resetInputInnerHTML(element: ElementRef){
    this.renderer.setProperty(element.nativeElement, "value", "");
  }

  getNoteContent(noteTitle: string){
    this.currentNote = noteTitle;    
    this.noteService.getNoteContent(this.currentNotebook, this.currentNote)
              .subscribe(
                res => {
                  this.noteItem = res;                  
                },
                err => {
                  this.currentNote = null;
                  this.handleError(err)
                }
              );

    
  }

  createNote(){
    this.currentNote = null;
    console.log("create Note");
    this.resetInputInnerHTML(this.inputTitle);
    this.resetInputInnerHTML(this.inputContent);
  }


  getInputNote(){
    return {title: this.inputTitle.nativeElement.value.trim(), content: this.inputContent.nativeElement.value.trim()};
  }

  saveNote(){
    if (this.currentNote === null){ //add new
      let payload = this.getInputNote();
      this.noteService.addNote(this.currentNotebook, payload).subscribe(
        res => {
          this.refeshDataAfterUpsert(res, payload.title);
        },
        err => this.handleError(err),
      );
    }
    else { //update
      let payload = this.getInputNote();
      this.noteService.updateNote(this.currentNotebook, this.currentNote, payload).subscribe(
        res => {
          this.refeshDataAfterUpsert(res, payload.title);
        },
        err => this.handleError(err),
      );
    }
  }

  refeshDataAfterUpsert(res, title: string){
    console.log(res);
    this.getAllNotes();
    this.currentNote = title;
  }

  deleteNote(){
    if (this.currentNote == null) return;

    this.noteService.deleteNote(this.currentNotebook, this.currentNote).subscribe(
      res => {
        this.createNote();
        console.log(res);
        this.getAllNotes();        
      },
      err => this.handleError(err),
    );

  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result: " + result);
    });
  }

  

}


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'confirm-dialog',
  template: `    
    <div mat-dialog-content>
      <p>{{data}}</p>      
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button>Ok</button>
    </div>
  `
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      console.dir(data);
      console.dir("data: " + data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

