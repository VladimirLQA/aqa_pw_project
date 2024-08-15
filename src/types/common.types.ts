export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export type TListPageNames = 'Products';

export interface UniqueElementProperty {
  readonly uniqueElement: string;
}

export type TGetObjectValues<T> = T[keyof T];
