import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../Note';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NoteCreateComponent } from '../note-create/note-create.component';
import { NoteEditComponent } from '../note-edit/note-edit.component';
@Component({
  selector: 'app-notes-dashboard',
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.css']
})
export class NotesDashboardComponent implements OnInit {

  constructor(private notes: NotesService,
    private router: Router,
    private dialog: MatDialog) { }
  Notes: Note[];
  SelectedNote: Note;
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notes.getNotes().subscribe(result => this.Notes = result.json());
  }
  delete(Id: number) {
    this.notes.delete(Id).subscribe(() =>
      this.getNotes())
  }
  AddNote(note: number) {
    let dialog = this.dialog.open(NoteCreateComponent, { width:'600px',panelClass: 'my-centered-dialog' });

    dialog.afterClosed().subscribe(() => this.getNotes());
  }
  EditNote(note: number) {
    console.log(note);
    let dialog = this.dialog.open(NoteEditComponent, { data: note });
    dialog.afterClosed().subscribe(() => this.getNotes());
  }
  pinnedToggle(note) {
    note.pinned = (note.pinned) ? false : true;
    this.notes.put(note, note.id).subscribe(() => this.getNotes());
  }
  IsChecked(id: number, note){
    console.log(note)
     note.checkList[id].isChecked = (note.checkList[id].isChecked) ? false : true;
     this.notes.put(note, note.id).subscribe(()=>this.getNotes());
  }
}
