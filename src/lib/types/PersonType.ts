export type PersonType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  pseudonyms?: PseudonymType[];
  aliases?: AliasType[];
}

export type PseudonymType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  title?: string;
}

export type DocumentType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  title?: string;
  series?: string;
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
  birthday?: Date;
  deathday?: Date;
  birthPlace?: string;
  citizenship?: string;
  gender?: string;
  description?: string;
  personId: number;
  documents?: DocumentType[];
}
