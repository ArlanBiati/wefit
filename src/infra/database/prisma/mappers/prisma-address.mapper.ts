import { Prisma } from '@prisma/client';
import { Address } from 'src/domain/profile/enterprise/entities/address';

export class PrismaAddressMapper {
  static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
    return {
      id: address.id.toString(),
      zipcode: address.zipcode,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      neighborhood: address.neighborhood,
      state: address.state,
    };
  }
}
