import { asyncReduce } from '../../../utils/array/reduce';
import { BaseModalPage } from './modal.page';

export class DetailsModalPage extends BaseModalPage {
  readonly uniqueElement = '//h5[contains(text(), "Details)]';
  readonly 'Edit modal button' = (module: 'Customer' | 'Products') => `//button[.="Edit ${module}"]`;
  readonly 'Row values' = '//section/div';
  readonly 'Modal row' = '.note.note-primary';

  async getDetailsModalData<T>(): Promise<T> {
    const rawData = await this.waitForElementArray(this['Row values']);
    const detailsData = await asyncReduce(rawData, async (acc, row) => {
      const [name, value] = (await this.getText(row)).split(':\n\n');
      if (name != 'Created On') {
        // @ts-expect-error ...
        if (['Price', 'Amount'].includes(name)) acc[name.toLowerCase() as string] = +value;
        // @ts-expect-error ...
        else acc[name.toLowerCase() as string] = value;
      }
      return acc;
    }, {} as T);

    return detailsData as T;
  }
}
