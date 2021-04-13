import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  private currentNotebook: string;
  private currentNote: string;

  noteTitles: Array<string>;
  noteItem;

  @ViewChild('inputTitle') inputTitle : ElementRef;
  @ViewChild('inputContent') inputContent : ElementRef;


  constructor(
            private _activatedRoute: ActivatedRoute,
            private router: Router,
            private renderer:  Renderer2, 
            private noteService: NoteService,
            )
  {  
    try {
      this.currentNotebook = this.router.getCurrentNavigation().extras.state.notebook;
    }
    catch(ex){
      this.currentNotebook = "master";
    }
    console.log("this.currentNotebook: " + this.currentNotebook);

    _activatedRoute.queryParams.subscribe(
      params => {
        this.currentNotebook = params['notebook'];
        console.log('queryParams', this.currentNotebook);
        this.getAllNotes();
      }
    );

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
    this.resetInputInnerHTML(this.inputTitle);
    this.resetInputInnerHTML(this.inputContent);
  }


  getInputNote(){
    return {title: this.inputTitle.nativeElement.value.trim(), content: this.inputContent.nativeElement.value.trim()};
  }

  saveNote(){
    let payload = this.getInputNote();
    if (payload.title.length <= 0 || payload.title.content <= 0){
      return;
    }

    if (!this.currentNote){ //add new
      
      this.noteService.addNote(this.currentNotebook, payload).subscribe(
        res => {
          this.refeshDataAfterUpsert(res, payload.title);
        },
        err => this.handleError(err),
      );
    }
    else { //update
      if (!this.openDialog(`Do you want to update ${this.currentNote} note?`)) return;

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
    if (!this.openDialog(`Do you want to delete ${this.currentNote} note?`)) return;

    this.noteService.deleteNote(this.currentNotebook, this.currentNote).subscribe(
      res => {
        this.createNote();
        console.log(res);
        this.getAllNotes();        
      },
      err => this.handleError(err),
    );

  }

  openDialog(message: string) : boolean {
    return confirm(message);
  }

}




