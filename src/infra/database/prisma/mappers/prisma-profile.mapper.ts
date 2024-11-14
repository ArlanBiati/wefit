import { Profile } from 'src/domain/profile/enterprise/entities/profile';
import { Prisma } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

type ProfileFull = Prisma.ProfileGetPayload<{
  include: {
    address: true;
  };
}>;

export class PrismaProfileMapper {
  static toDomain(raw: ProfileFull): Profile {
    return Profile.create(
      {
        name: raw.name,
        email: raw.email,
        cellphone: raw.cellphone,
        phone: raw.phone,
        cnpj: raw.cnpj,
        cpf: raw.cpf,
        acceptTerms: raw.accept_terms,
        profileType: raw.profile_type,
        addressId: raw.address_id,
        address: raw.address,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(profile: Profile): Prisma.ProfileUncheckedCreateInput {
    return {
      id: profile.id.toString(),
      name: profile.name,
      email: profile.email,
      cellphone: profile.cellphone,
      phone: profile.phone,
      cnpj: profile.cnpj,
      cpf: profile.cpf,
      accept_terms: profile.acceptTerms,
      profile_type: profile.profileType,
      address_id: profile.addressId,
    };
  }
}
