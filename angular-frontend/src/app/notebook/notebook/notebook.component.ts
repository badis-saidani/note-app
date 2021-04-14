import { Component, Input, OnInit } from '@angular/core';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'notebooks',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  
  notebooks: object;

  constructor(private notebookService: NotebookService) {
  }

  ngOnInit(): void {
    this.loadNotebooks();
  }

  loadNotebooks(){
    this.notebookService.getNoteBooks().subscribe(
      data => {
        this.notebooks = data;
        console.log(data.length);
      },
      err => console.log(err)
    )
  }

}
