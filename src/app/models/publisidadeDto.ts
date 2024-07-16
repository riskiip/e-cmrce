export interface Kategoria {
  id: number;
  naran: string;
}

export interface Subkategoria {
  id: number;
  naran: string;
  kategoria: number;
}

export interface Munisipiu {
  id: number;
  naran: string;
}

export interface Postu {
  id: number;
  naran: string;
  munisipiu: number;
}
