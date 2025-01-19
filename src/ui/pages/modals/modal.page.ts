import { UniqueElement } from '../salesPortal.page';

export abstract class BaseModalPage extends UniqueElement {
  readonly 'Close modal button' = 'button.btn-close';
  readonly 'Cancel modal button' = '//button[.="Cancel"]';

  async clicOnCloseModalButton() {
    await this.clickOn(this['Close modal button']);
  }

  async clicOnCancelModalButton() {
    await this.clickOn(this['Cancel modal button']);
  }
}
