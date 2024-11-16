import { ProductsListPage } from '../../pages/products/productsList.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';
import { SalesPortalService } from '../salesPortal.service';
import { IProduct, IProductResponse } from '../../../types/products/product.types';
import { ProductsStorage } from '../../../utils/storages/index';
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
    await this.salesPortalPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
    ProductsStorage.addEntity(response.data.Product);
  }

  @logStep('Click on "Save new" button')
  private async clickOnSaveNewProductButton() {
    await this.addNewProductPage.clickOnSaveNewProductButton();
  }

  private async interceptCreateProductResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Products;
    const response = await this.salesPortalPage
      .interceptResponse<IProductResponse>(
        url, this.clickOnSaveNewProductButton.bind(this),
      );
    validateResponse({
      response,
      status: HTTP_STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });
    return response;
  }

  // service = ProductService;
  // assert = new ProductsAssertions(this.page);
  // homePage = new HomePage(this.page);
}
