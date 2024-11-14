import { Module } from '@nestjs/common';
import { AddressRepository } from 'src/domain/profile/application/repositories/address.repository';
import { ProfileRepository } from 'src/domain/profile/application/repositories/profile.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProfileRepository } from './prisma/repositories/prisma-profile.repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address.repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    { provide: AddressRepository, useClass: PrismaAddressRepository },
  ],
  exports: [PrismaService, ProfileRepository, AddressRepository],
})
export class DatabaseModule {}
