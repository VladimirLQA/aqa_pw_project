import { expect } from '@playwright/test';
import { CustomersStorageSingleton } from '../../utils/storages/index';
import { generateNewCustomer } from '../../data/customers/generateNewCustomer';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { logStep } from '../../utils/reporter/decorators/logStep';
import signInApiService from './signIn.service';
import { ICustomerFromResponse } from '../../types/customers/customers.types';
import { controllers } from '../controllers';

export class CustomersApiService {
  constructor(private controller = controllers.customers) { }

  @logStep('Create {amount} customers')
  async populateCustomers(amount: number = 1) {
    const token = await signInApiService.getToken();

    for (let i = 1; i <= amount; i++) {
      const cutomerToCreate = generateNewCustomer();
      const createdCustomer = await this.controller.create({ data: cutomerToCreate, token });

      expect(createdCustomer.status).toBe(HTTP_STATUS_CODES.CREATED);
      CustomersStorageSingleton.addEntity(createdCustomer.data.Customer);
    }
  }

  @logStep('Delete customer')
  async deleteCreatedCustomers() {
    const token = await signInApiService.getToken();

    for (const customer of CustomersStorageSingleton.getAllEntities()) {
      const response = await this.controller.delete({ data: { _id: customer._id }, token });
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomer(email: string) {
    const token = await signInApiService.getToken();
    const customers = await this.controller.getAll({ token });
    const customerToDelete = customers.data.Customers.find((c: ICustomerFromResponse) => c.email === email);
    if (customerToDelete) {
      const response = await this.controller.delete({ data: { _id: customerToDelete._id }, token });
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
      return;
    } else {
      throw new Error(`Customer with email: '${email}' was not found`);
    }
  }
}

export default new CustomersApiService();