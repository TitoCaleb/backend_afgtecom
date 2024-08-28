import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Provider } from './Provider';
import { BusinessSector } from './BusinessSector';

@Entity({ name: 'provider_sector' })
@Unique(['provider', 'businessSector'])
export class ProviderSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider, (provider) => provider.providerSectors)
  provider: Provider;

  @ManyToOne(
    () => BusinessSector,
    (businessSector) => businessSector.providerSectors,
  )
  businessSector: BusinessSector;

  constructor(data: Partial<ProviderSector>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      provider: this.provider,
      businessSector: this.businessSector,
    };
  }
}
