import { Address } from '../../enterprise/entities/address';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<Address>;
}
