import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotesDashboardComponent} from './notes-dashboard/notes-dashboard.component';
import {NoteEditComponent} from './note-edit/note-edit.component';
import {NoteCreateComponent} from './note-create/note-create.component';

const route : Routes = [
  {path:'' , redirectTo: '/Dashboard', pathMatch:'full'},
  {path:'Dashboard', component: NotesDashboardComponent},
  {path:'Edit/:id',component:NoteEditComponent},
  {path:'CreateNote',component:NoteCreateComponent}
 ]

@NgModule({
  imports: [
    RouterModule.forRoot(route)
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
