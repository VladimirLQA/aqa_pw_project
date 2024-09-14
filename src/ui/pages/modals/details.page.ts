import { asyncMap } from '../../../utils/array/map';
import { BaseModalPage } from './modal.page';

const moduleDetailsValues = {
  products: ['name', 'amount', 'price', 'manufacturer', 'notes'],
  customers: ['email', 'name', 'country', 'city', 'street', 'house', 'flat', 'phone',
    'notes',
  ],
};

export class DetailsModalPage extends BaseModalPage {
  protected readonly uniqueElement = '//h5[contains(text(), "Details)]';

  readonly 'Edit modal button' =
    (module: 'Customer' | 'Products') => `//button[.="Edit ${module}"]`;

  readonly 'Row values' = '//div[@class="modal-body"]//div[strong]/div';

  readonly 'Modal row' = '.note.note-primary';

  // TODO implement redused getDetailsMethod for customers and products
  async getDetailsModalData() {
    const rawData = await this.waitForElementArray(this['Row values']);
    const extractedDetails = await asyncMap(
      [...rawData], async (row) => this.getText(row),
    );

    const mappedData = {};

    // return {
    //   email,
    //   name,
    //   country,
    //   city,
    //   street,
    //   house: +house,
    //   flat: +flat,
    //   phone,
    //   notes,
    // };
  }

  // async getParsedDetailsData() {
  //   const parsedData: IInitObject = {};
  //   await utils.browserPause(1000);
  //   const modalRowsData = await this.waitForElementsArray(this['Modal data rows']);
  //   const rows = await Promise.all(await modalRowsData.map((elem) => elem));

  //   await asyncForEach(rows, async (row) => {
  //     const [name, value] = (await row.getText()).split(':\n');
  //     parsedData[name.toLowerCase()] = value;
  //   });
  //   return parsedData;
  // }
}
