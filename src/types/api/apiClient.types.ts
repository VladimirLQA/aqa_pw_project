export type IRequestOptions<Data = object> = {
  url: string;
  options: {
    method: Method;
    params?: { [key: string]: string | number | boolean };
    headers: Record<string, string>;
    data?: Data;
    timeout?: number;
  };
  requestType: 'json' | 'formData';
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
