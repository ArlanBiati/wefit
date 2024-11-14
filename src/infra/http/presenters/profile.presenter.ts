import { Profile } from 'src/domain/profile/enterprise/entities/profile';

export class ProfilePresenter {
  static toHttp(profile: Profile) {
    return {
      id: profile.id.toString(),
      name: profile.name,
      email: profile.email,
      cellphone: profile.cellphone,
      phone: profile.phone,
      cnpj: profile.cnpj,
      cpf: profile.cpf,
      acceptTerms: profile.acceptTerms,
      profileType: profile.profileType,
      addressId: profile.addressId,
      address: profile.address,
    };
  }
}
