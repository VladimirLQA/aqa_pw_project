export type IRequestOptions<Data = object> = {
  baseURL: string;
  url: string;
  method: Method;
  headers: Record<string, string>;
  data?: Data;
};

export type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface IResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, unknown>;
}

export interface RequestParams<T> {
  data?: T;
  token: string;
}

export type Id = { _id: string };
export type TBody<T> = { body?: T };

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}
