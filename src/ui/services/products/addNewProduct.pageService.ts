import { ProductsListPage } from '../../pages/products/productsList.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';
import { SalesPortalService } from '../salesPortal.service';
import { IProduct, IProductResponse } from '../../../types/products/product.types';
import { Products } from '../../../utils/storages/index';
import { logStep } from '../../../utils/reporter/decorators/logStep';
import { apiConfig } from '../../../api/config/apiConfig';
import { HTTP_STATUS_CODES } from '../../../data/http/statusCodes';
import { validateResponse } from '../../../utils/validations/apiValidation';

export class AddNewProductService extends SalesPortalService {
  private productsPage = new ProductsListPage(this.page);

  private addNewProductPage = new AddNewProductPage(this.page);

  @logStep('Create New Product')
  async createProduct(product: IProduct) {
    await this.addNewProductPage.fillProductInputs(product);
    const response = await this.interceptCreateProductResponse();
    await this.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
    Products.addProduct(response.data.Product);
  }

  private async clickOnSaveNewProductButton() {
    await this.addNewProductPage.clickOnSaveNewProductButton();
  }

  private async interceptCreateProductResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Products;
    const response = await this.interceptResponse<IProductResponse>(
      url, this.clickOnSaveNewProductButton.bind(this),
    );
    validateResponse(response, HTTP_STATUS_CODES.CREATED, true, null);
    return response;
  }

  // service = ProductService;
  // assert = new ProductsAssertions(this.page);
  // homePage = new HomePage(this.page);
}
