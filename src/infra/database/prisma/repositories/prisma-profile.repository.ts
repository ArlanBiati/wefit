import { Injectable } from '@nestjs/common';
import { ProfileRepository } from 'src/domain/profile/application/repositories/profile.repository';
import { PrismaService } from '../prisma.service';
import { Pagination } from 'src/core/repositories/pagination.repository';
import { Profile } from 'src/domain/profile/enterprise/entities/profile';
import { PrismaProfileMapper } from '../mappers/prisma-profile.mapper';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination?: Pagination,
  ): Promise<{ profiles: Profile[]; total: number }> {
    const { page, perPage } = pagination || {};

    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);

    const totalProfiles = await this.prisma.profile.count();

    const profiles = await this.prisma.profile.findMany({
      include: { address: true },
      skip,
      take,
    });

    return {
      profiles: profiles.map((profile) =>
        PrismaProfileMapper.toDomain(profile),
      ),
      total: totalProfiles,
    };
  }

  async findByEmail(email: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      where: { email },
      include: { address: true },
    });

    if (!profile) {
      return null;
    }

    return PrismaProfileMapper.toDomain(profile);
  }

  async create(profile: Profile): Promise<Profile> {
    const data = PrismaProfileMapper.toPrisma(profile);
    await this.prisma.profile.create({
      data,
    });

    return profile;
  }
}
