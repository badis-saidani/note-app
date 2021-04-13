import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NotebookService } from '../notebook/notebook.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notebooks;

  @ViewChild('inputNotebook') inputNotebook : ElementRef;  

  constructor(private auth: AuthService, private router: Router,
    private notebookService: NotebookService) { }

  ngOnInit(): void {
    console.log('inside home');
    this.loadNotebooks();
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']); //move to home after logout
  }

  loadNotebooks(){
    this.notebookService.getNoteBooks().subscribe(
      data => {
        this.notebooks = data;
        console.log(data);
      },
      err => console.log(err)
    )
  }

  addNotebook(){
    let name = this.inputNotebook.nativeElement.value.trim();
    console.log(name);

    this.notebookService.addNoteBook({name}).subscribe(
      data => {
        console.log(data);
        this.loadNotebooks();
      },
      err => console.log(err)
    )
  }

}
