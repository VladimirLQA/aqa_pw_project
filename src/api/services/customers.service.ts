import { expect } from '@playwright/test';
import { Customers } from '../../utils/storages/index';
import { generateNewCustomer } from '../../data/customers/generateNewCustomer';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { logStep } from '../../utils/reporter/decorators/logStep';
import signInApiService from './signIn.service';
import { ICustomerFromResponse } from '../../types/customers/customers.types';
import { clients } from '../clients';

export class CustomersApiService {
  constructor(private client = clients.customers) { }

  @logStep('Create {amount} customers')
  async populateCustomers(amount: number = 1) {
    const token = await signInApiService.signInAsAdminApi();

    for (let i = 1; i <= amount; i++) {
      const cutomerToCreate = generateNewCustomer();
      const createdCustomer = await this.client.create(cutomerToCreate, token);

      //   expect(createdCustomer.status).toBe(HTTP_STATUS_CODES.CREATED);

      Customers.add(createdCustomer.data.Customer);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomers() {
    const token = await signInApiService.signInAsAdminApi();

    for (const customer of Customers.getAll()) {
      const response = await this.client.delete(customer._id, token);
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomer(email: string) {
    const token = await signInApiService.signInAsAdminApi();

    const customers = await this.client.getAll(token);
    const customerToDelete =
      customers.data.Customers.find((c: ICustomerFromResponse) =>
        c.email === email);
    if (customerToDelete) {
      const response = await this.client.delete(customerToDelete._id, token);
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
    } else {
      throw new Error(`Customer with email: '${email}' was not found`);
    }
  }
}
