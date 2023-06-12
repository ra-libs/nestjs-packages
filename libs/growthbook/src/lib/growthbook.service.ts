import { GrowthBook } from '@growthbook/growthbook';
import { Inject, Injectable } from '@nestjs/common';
import { GrowthbookOptions } from './growthbook.interface';

@Injectable()
export class GrowthbookService {
  @Inject('GROWTHBOOK_CLIENT')
  private client!: GrowthBook;

  isOn(name: string, options: GrowthbookOptions = {}) {
    if (options.customerId) {
      this.client.setAttributeOverrides({
        customerId: options.customerId,
      });
    }

    return this.client.isOn(name);
  }
}
