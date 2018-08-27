import { Injectable } from '@angular/core';
import {Note} from './Note';
import {Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  _Notes : Note[];
  getNotes()
  {
    return this.http.get("https://localhost:44311/api/Data/GetData");
  }
  getNoteById(Id){
     return this.http.get("https://localhost:44311/api/Data/GetData/"+Id);
  }
  put(note:Note, Id : number){
    return this.http.put("https://localhost:44311/api/Data/PutData/"+Id, note);
    //console.log("updated")
  }
  post(note:Note){
    return this.http.post("https://localhost:44311/api/Data/PostData", note);
  }
  delete(Id:number)
  {
    return this.http.delete("https://localhost:44311/api/Data/DeleteData/"+Id);
  }
  constructor(private http : Http) {}
}







