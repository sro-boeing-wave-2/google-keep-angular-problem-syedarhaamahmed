import { Component, OnInit, Input, Inject } from '@angular/core';
import { Note } from '../Note';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotesService } from '../notes.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  TempNote: Note;
  note: Note;
  id: number;
  constructor(
    private noteservice: NotesService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NoteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    console.log(data);
    this.getNote();
  }
  EditForm = this.fb.group({
    Id: [''],
    Title: [''],
    Text: [''],
    checklist: this.fb.array([

    ]),
    label: this.fb.array([

    ]),
    IsPinned:["false"],
  });
  get label() {
    return this.EditForm.get('label') as FormArray;
  }
  addlabel() {
    this.label.push(this.fb.group({
      text: ['']
    }));
  }
  get checklist() {
    return this.EditForm.get('checklist') as FormArray;
  }
  addchecklist() {
    this.checklist.push(this.fb.group({
      text: [''],
    }));
  }
  goBack(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  getNote(): void {
    const Id = this.data;
    this.noteservice.getNoteById(Id).subscribe(notes => {
      this.note = notes.json();
      console.log(this.note);
      console.log(notes.json());
      notes.json().checklist.forEach(element => {
        this.addchecklist();
      });
      notes.json().label.forEach(element => {
        this.addlabel();
      });
    });
  }
  saveDetails(Id: number) {
    console.log(Id);
    console.log(this.EditForm.value as Note);
    this.noteservice.put(this.EditForm.value as Note, Id).subscribe(result => console.log(result.status));
    this.dialogRef.close();
  }

}
