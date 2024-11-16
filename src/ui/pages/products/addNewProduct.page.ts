import { IProduct, IProductResponse } from 'types/products/product.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { validateResponse } from 'utils/validations/apiValidation';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { ProductsStorage } from 'utils/storages';
import { logStep } from 'utils/reporter/decorators/logStep';
import { apiConfig } from '../../../api/config/apiConfig';

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';

  readonly 'Name input' = this.findElement('#inputName');

  readonly 'Manufacturer dropdown' = this.findElement('#inputManufacturer');

  readonly 'Price input' = this.findElement('#inputPrice');

  readonly 'Amount input' = this.findElement('#inputAmount');

  readonly 'Notes input' = this.findElement('#textareaNotes');

  readonly 'Save New Product button' = this.findElement('#save-new-product');

  readonly 'Page body' = this.findElement('//div[@id="root"]/div');

  async fillProductInputs(product: IProduct) {
    product.name && await this.fillValue(this['Name input'], product.name);
    product.manufacturer && await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    product.price && await this.fillValue(this['Price input'], `${product.price}`);
    product.amount && await this.fillValue(this['Amount input'], `${product.amount}`);
    product.notes && await this.fillValue(this['Notes input'], product.notes);
  }

  async clickOnSaveNewProductButton() {
    await this.clickOn(this['Save New Product button']);
  }
}
