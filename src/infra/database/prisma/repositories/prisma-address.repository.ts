import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddressRepository } from 'src/domain/profile/application/repositories/address.repository';
import { Address } from 'src/domain/profile/enterprise/entities/address';
import { PrismaAddressMapper } from '../mappers/prisma-address.mapper';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Address): Promise<Address> {
    const data = PrismaAddressMapper.toPrisma(address);
    await this.prisma.address.create({
      data,
    });

    return address;
  }
}
