export interface ISearchResult {
  skillGroupCode: string;
  skillGroupName: string;
  categoryName: string;
  categoryCode: string;
  techStacks: Ilookup[];
  id: string;
}

export interface Iuser {
  empName: string;
  eid: string;
}

export interface Ilookup {
  id: number;
  n: string;
  c: string;
  isSelected?: boolean;
  cc?: string;
  pc?: string;
}

export interface ISelectedTechs {
  skillGroupCode: string;
  categoryCode: string;
  techCode: string;
  expertCode: string;
}

export interface ISaveObject {
  eid: string;
  techStacks: ISelectedTechs[];
}