import { asyncMap } from '../../../utils/array/map';
import { BaseModalPage } from './modal.page';

const moduleDetailsValues = {
  products: ['name', 'amount', 'price', 'manufacturer', 'createdOn', 'notes'],
  customers: ['email', 'name', 'country', 'city', 'street', 'house', 'flat', 'phone',
    'createdOn', 'notes',
  ],
};

export class DetailsModalPage extends BaseModalPage {
  protected readonly uniqueElement = '//h5[contains(text(), "Details)]';

  readonly 'Edit modal button' =
    (module: 'Customer' | 'Products') => `//button[.="Edit ${module}"]`;

  readonly 'Row values' = '//div[@class="modal-body"]//div[strong]/div';

  async getDetailsModalData() {
    const rawData = await this.waitForElementArray(this['Row values']);
    const [email, name, country, city, street,
      house, flat, phone,, notes] = await asyncMap(
      [...rawData], async (row) => this.getText(row),
    );

    return {
      email,
      name,
      country,
      city,
      street,
      house: +house,
      flat: +flat,
      phone,
      notes,
    };
  }
}
