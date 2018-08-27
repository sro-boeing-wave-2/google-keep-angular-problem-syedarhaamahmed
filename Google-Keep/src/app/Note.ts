
export class Note{
  Id : number;
  Title : string;
  Message : string;
  CheckList : CheckList[];
  Label : Label[];
  Pinned : boolean;
}

export class Label{
  Id : number;
  text :string;
}

export class CheckList{
  Id : number;
  text  : string;
}


