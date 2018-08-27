import { Component, OnInit, Inject } from '@angular/core';
import {NotesService} from '../notes.service';
import {FormBuilder, FormArray} from '@angular/forms';
import {Note} from '../Note';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  constructor(
    private noteservice : NotesService,
     private fb : FormBuilder,
    private router : Router,
    private location : Location,
    public dialogRef: MatDialogRef<NoteCreateComponent>){}

  CreateNoteDF = this.fb.group({
    Title : [''],
    Text : [''],
    checklist: this.fb.array([
      this.fb.group({
        text : ['']
      })
    ]),
    label: this.fb.array([
      this.fb.group({
        text : ['']
      })
    ]),
    IsPinned:["false"],
  });

  get label(){
    return this.CreateNoteDF.get('label') as FormArray;
  }

  addLabel(){
    this.label.push(this.fb.group({
      text : ['']
    })
  );
  }

  get checklist(){
    return this.CreateNoteDF.get('checklist') as FormArray;
  }
  addCheckList(){
    this.checklist.push(this.fb.group({text : ['']
  }));
  }
  onSubmit():void{
    this.GenerateNote();
    this.dialogRef.close();
  }
  goBack(){
    this.dialogRef.close();
  }
  GenerateNote():void{
    console.log(this.CreateNoteDF.value);
    this.noteservice.post(this.CreateNoteDF.value as Note).subscribe(result => {
      console.log(result.statusText)
      this.router.navigate(['']);
    });
  }
  AddLabel():void{}

  ngOnInit() {}
}
