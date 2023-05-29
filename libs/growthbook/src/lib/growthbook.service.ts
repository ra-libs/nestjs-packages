import { GrowthBook } from '@growthbook/growthbook';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GrowthbookService {
  @Inject('GROWTHBOOK_CLIENT')
  private client!: GrowthBook;

  isOn(name: string) {
    return this.client.isOn(name);
  }
}
