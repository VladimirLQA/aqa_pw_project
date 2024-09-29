import Ajv from 'ajv';
import { expect } from '@playwright/test';
import { IResponse, IResponseFields } from '../../types/api/apiClient.types';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { TGetObjectValues } from '../../types/common.types';

export interface IValidateResponse extends Partial<IResponseFields> {
  response: IResponse;
  status: TGetObjectValues<typeof HTTP_STATUS_CODES>;
}

export interface IValidateResponseSchema extends IValidateResponse {
  schema: object;
}

export const validateResponse = (info: IValidateResponse) => {
  expect(info.response.status).toBe(info.status);
  if (info.IsSuccess) {
    expect(info.response.data.IsSuccess).toBe(info.IsSuccess);
  }
  if (info.ErrorMessage) {
    expect(info.response.data.ErrorMessage).toBe(info.ErrorMessage);
  }
};

export const validateSchema = (response: IResponse, schema: object) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.data);
  // if (!isValidSchema) {
  //   Logger.log(JSON.stringify(validate.errors), "error");
  // }
  expect(isValidSchema).toBe(true);
};

export const validateResponseWithSchema = (info: IValidateResponseSchema) => {
  validateSchema(info.response, info.schema);
  validateResponse({
    response: info.response,
    status: info.status,
    IsSuccess: info.IsSuccess,
    ErrorMessage: info.ErrorMessage,
  });
};
