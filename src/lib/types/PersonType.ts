export type PersonType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;

  birthday?: Date;
  birthPlace?: string;
  deathday?: Date;
  details?: string;
  signs?: string;
  nationality?: string;
  gender?: string;
  religion?: string;
  ideology?: string;

  pseudonyms?: PseudonymType[];
  aliases?: AliasType[];
  photos?: FileType[];
}

export type PseudonymType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  title?: string;
  personId: number;
}

export type DocumentType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  title?: string;
  series: string;
  issued?: Date;
  aliasId: number;
}

export type AliasType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  firstName?: string;
  secondName?: string;
  surname?: string;
  citizenship?: string;
  description?: string;
  personId: number;
  documents?: DocumentType[];
}

export type FileType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  filename?: string;
  bucket?: string;
  mime?: string;
  url?: string;
  personId: number;
}
